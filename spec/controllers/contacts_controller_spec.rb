feature 'ContactsController' do
  let!(:user){ create(:user) }
  let!(:contact){ create(:contact, user: user, name: "Imperium") }

  describe 'contact associations' do
    
    context 'by_user' do
      
      let!(:test_score){ create(:test_score, user: user, contact: contact) }

      it 'gets contacts for user' do
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_user_contacts_path}.json?user_id=#{user.id}"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        contacts = response['result']['contacts']
        expect(contacts.count).to be 1
        expect(contacts.first['user_id']).to be user.id
        expect(contacts.first['name']).to eql "Imperium"
        test_score_response = contacts.first['test_score']
        expect(test_score_response['user_id']).to be user.id
        expect(test_score_response['id']).to be test_score.id
      end

      it 'gets no contacts for user' do
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_user_contacts_path}.json?user_id=10"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        contacts = response['result']['contacts']
        expect(contacts.empty?).to be true
      end

    end
    
  end

  describe 'contact CRUD and status transition' do

    context 'destroy' do
      #TEST contact destruction with associated plans
      let!(:plan){ create(:plan, contact: contact)}

      it 'removes contact in contact list witha associated plan' do
        login_with_service u = { email: user.email, password: '12345678' }
        
        with_rack_test_driver do
          page.driver.delete "#{contacts_path}/#{contact.id}.json" 
        end

        expect(page.status_code).to be 204
        expect(Contact.count).to be 0
      end
    end
    
    context 'create and update' do

      it 'creates contact in contact list' do
        login_with_service u = { email: user.email, password: '12345678' }

        new_contact_request = {contact:{user_id: user.id, name: 'Filomeno', email: 'filo@meno.com', phone: '67432341', description: 'León'}}
        with_rack_test_driver do
          page.driver.post "#{contacts_path}.json", new_contact_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        new_contact = response['result']
        expect(new_contact['user_id']).to be user.id
        expect(new_contact['name']).to eql 'Filomeno'
        created_contact = Contact.find(new_contact['id'])

        update_contact_request = {contact:{name: "Arturo", email: 'cemento@cemex.mx', status: 'contacted'} }
        with_rack_test_driver do
          page.driver.put "#{contacts_path}/#{created_contact.id}.json", update_contact_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['email']).to eql "cemento@cemex.mx"
        expect(response['result']['name']).to eql "Arturo"

        visit "#{by_user_contacts_path}.json?user_id=#{user.id}"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        contacts = response['result']['contacts']
        expect(contacts.count).to be 2

      end

      it 'should raise errors on create' do
        new_contact_request = {contact:{user_id: user.id, name: 'Filomeno', email: 'filo@meno.com', phone: '67432341', description: 'León', status:'no_existe'}}
        login_with_service u = { email: user.email, password: '12345678' }
        
        with_rack_test_driver do
          page.driver.post "#{contacts_path}.json", new_contact_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        error = response['error']
        expect(error.length).to be > 0

      end

    end
    
    context 'update transitions' do

      it 'should do transitions correctly' do
       
        expect(contact.status).to eql 'to_invite'
        contact.invite!
        expect(contact.status).to eql 'contacted'
        contact.watch_video!
        expect(contact.status).to eql 'to_close'
        contact.rule_out!
        expect(contact.status).to eql 'ruled_out'
        contact.update_attribute(:status, 'to_close')
        contact.is_interested!
        expect(contact.status).to eql 'to_register'
        contact.register!
        expect(contact.status).to eql 'registered'
      end

      it 'should raise errors on invalid transitions' do
        update_contact_request = {contact:{status: 'registered'} }
        login_with_service u = { email: user.email, password: '12345678' }

        with_rack_test_driver do
          page.driver.put "#{contacts_path}/#{contact.id}.json", update_contact_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Cambio de estado inválido"
      end

    end

  end

end
