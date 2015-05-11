feature 'RequestsController' do
  let!(:user) { create(:user) }
  describe 'request process' do
    context 'request creation' do

      it 'successfully creates request' do
          new_request = { source_name: "Pedrito Bodoque", source_email: "dmiramon@gmail.com", source_text: "Me quiero registrar y soy de MAP", user_id:user.id}
          # Validates request creation
          with_rack_test_driver do
              page.driver.post "/requests.json", { request: new_request}
          end
          response = JSON.parse(page.body)
          expect(response['success']).to be true
          expect(response['result']['source_name']).to eql "Pedrito Bodoque"
          expect(response['result']['source_email']).to eql "dmiramon@gmail.com"
      end

      it 'successfully creates request, accepts request, invalid accepts request' do
          new_request = { source_name: "Pedrito Bodoque", source_email: "dmiramon@gmail.com", source_text: "Me quiero registrar y soy de MAP", user_id:user.id}
          # Validates request creation
          page1 = nil
          with_rack_test_driver do
            page1 = page.driver.post "/requests.json", { request: new_request}
          end
          response1 = JSON.parse(page1.body)
          expect(response1['success']).to be true
          expect(response1['result']['source_name']).to eql "Pedrito Bodoque"
          expect(response1['result']['source_email']).to eql "dmiramon@gmail.com"
          expect(response1['result']['id']).not_to be nil
          # Accepts a request
          id = response1['result']['id']
          page2 = nil
          with_rack_test_driver do
            page2 = page.driver.post "/requests/#{id}/accept.json"
          end
          response2 = JSON.parse(page2.body)
          expect(response2['success']).to be true
          expect(response2['result']['status']).to eql "accepted"
          # Invalid accept request
          page3 = nil
          with_rack_test_driver do
            page3 = page.driver.post "/requests/#{id}/accept.json"
          end
          response3 = JSON.parse(page3.body)
          expect(response3['success']).to be false
          expect(response3['error']).not_to be nil
      end

      it 'successfully creates request, rejects request, invalid rejects request' do
          new_request = { source_name: "Pedrito Bodoque", source_email: "dmiramon@gmail.com", source_text: "Me quiero registrar y soy de MAP", user_id:user.id}
          # Validates request creation
          page1 = nil
          with_rack_test_driver do
            page1 = page.driver.post "/requests.json", { request: new_request}
          end
          response1 = JSON.parse(page1.body)
          expect(response1['success']).to be true
          expect(response1['result']['source_name']).to eql "Pedrito Bodoque"
          expect(response1['result']['source_email']).to eql "dmiramon@gmail.com"
          expect(response1['result']['id']).not_to be nil
          # Accepts a request
          id = response1['result']['id']
          page2 = nil
          with_rack_test_driver do
            page2 = page.driver.post "/requests/#{id}/reject.json"
          end
          response2 = JSON.parse(page2.body)
          expect(response2['success']).to be true
          expect(response2['result']['status']).to eql "rejected"
          # Invalid accept request
          page3 = nil
          with_rack_test_driver do
            page3 = page.driver.post "/requests/#{id}/reject.json"
          end
          response3 = JSON.parse(page3.body)
          expect(response3['success']).to be false
          expect(response3['error']).not_to be nil
      end
    end
  end
end