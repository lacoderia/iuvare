feature 'ContactsController' do
  let!(:user){ create(:user) }
  let!(:contact){ create(:contact, user: user, name: "Imperium") }

  describe 'contact associations' do

    context 'transitions' do 
      
      it 'returns correct transitions' do
        visit "#{transitions_contacts_path}.json"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        transitions = response['result']['transitions']
        expect(transitions.count).to be 5
        expect(transitions['to_invite']['previous']).to be nil
        expect(transitions['to_close']['next'].count).to be 2
        expect(transitions['registered']['next']).to be nil
      end

    end
      
    context 'by_user' do

      it 'gets contacts for user' do
        visit "#{by_user_contacts_path}.json?user_id=#{user.id}"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        contacts = response['result']['contacts']
        expect(contacts.count).to be 1
        expect(contacts.first['user_id']).to be user.id
        expect(contacts.first['name']).to eql "Imperium"
      end

      it 'gets no contacts for user' do
        visit "#{by_user_contacts_path}.json?user_id=10"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        contacts = response['result']['contacts']
        expect(contacts.empty?).to be true
      end

    end
    
  end

  describe 'contact CRUD and status transition' do
    
    #params.require(:contact).permit(:user_id, :name, :email, :phone, :description, :status)
    
    context 'create and update' do

      it 'creates contact in contact list' do

        new_contact_request = {contact:{user_id: user.id, name: 'Filomeno', email: 'filo@meno.com', phone: '67432341', description: 'León', status: "to_invite"}}
        with_rack_test_driver do
          page.driver.post "#{contacts_path}.json", new_contact_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        new_contact = response['result']
        expect(new_contact['user_id']).to be user.id
        expect(new_contact['name']).to eql 'Filomeno'
        created_contact = Contact.find(new_contact['id'])

        update_contact_request = {contact:{name: "Arturo", email: 'cemento@cemex.mx'} }
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
        new_contact_request = {contact:{user_id: user.id, name: 'Filomeno', email: 'filo@meno.com', phone: '67432341', description: 'León'}}
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
        contact.register!
        expect(contact.status).to eql 'registered'
      end

      it 'should raise errors on invalid transitions' do

      end

    end

  end

end
