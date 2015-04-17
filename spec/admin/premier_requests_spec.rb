feature 'PremierRequests' do

  let!(:premier) { create(:premier) }
  let!(:first_request) { create(:request, user: premier) }
  let!(:second_request) { create(:request, user: premier) }
  let!(:third_request) { create(:request) }

  describe 'Pending requests ' do

    it 'should transition correctly through request states' do

      expect(Request.by_premier(premier).length).to be 2
      expect(Request.pending.by_premier(premier).length).to be 2
      first_request.accept!
      expect(Request.pending.by_premier(premier).length).to be 1
      expect(Request.accepted.by_premier(premier).length).to be 1
      second_request.reject!
      expect(Request.pending.by_premier(premier).length).to be 0
      expect(Request.rejected.by_premier(premier).length).to be 1

    end

  end

end
