require 'rails_helper'

RSpec.describe SearchesController, type: :controller do
    fixtures :searches

    describe 'POST #create' do
        let(:query) { 'test query' }
        it 'creates a new search' do
            expect { post :create, params: { query: query } }.to change(Search, :count).by(1)
        end
        it 'returns a 200 status code and suggestions' do
            post :create, params: { query: query }
            expect(JSON.parse(response.body)['status']).to eq('200')
            expect(JSON.parse(response.body)).to have_key('suggestions')
            expect(JSON.parse(response.body)['suggestions']).to be_a(Array)
        end
    end

    describe 'POST #resolve_queries' do
        let(:query) { 'test query' }
        it 'creates or updates a search' do
            post :resolve_queries, params: { query: query }
            expect(JSON.parse(response.body)['status']).to eq('200')
            expect(JSON.parse(response.body)).to have_key('new_query')
            expect(JSON.parse(response.body)['new_query']).to be_a(Hash)
        end
        it 'returns a 200 status code and the new query' do
            post :resolve_queries, params: { query: 'test query' }
            expect(JSON.parse(response.body)['status']).to eq('200')
        end
    end

    describe 'DELETE #delete_incomplete_queries' do
        it 'deletes all incomplete queries and returns a 200 status code' do
            expect { delete :delete_incomplete_queries }.to change { Search.where(completed: false).count }.to(0)
            expect(JSON.parse(response.body)['status']).to eq('200')
        end
    end
end

                