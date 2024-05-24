require 'rails_helper'

RSpec.describe Search, type: :model do
    describe 'validations' do
        it 'should validate the presence of a user_ip_address' do
            search = Search.new(query: 'test query', completed: false)
            expect(search.valid?).to be false
            expect(search.errors[:user_ip_address]).to include("can't be blank")
        end
        it 'should validate the presence of a query' do
            search = Search.new(user_ip_address: '127.0.0.1', completed: false)
            expect(search.valid?).to be false
            expect(search.errors[:query]).to include("can't be blank")
        end
    end
end