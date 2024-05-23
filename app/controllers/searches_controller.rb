class SearchesController < ApplicationController

    def index
        user_ip_address = request.remote_ip
        @search_history = Search.search_history(user_ip_address)
    end

    def create
        user_ip_address = request.remote_ip
        query = params[:query]
        Search.create!( user_ip_address: user_ip_address, query: query, completed: false)
        render json: { status: '200' }
    end

    def resolve_queries
        user_ip_address = request.remote_ip
        final_query = params[:query]
        @incomplete_searches = Search.incomplete_search(user_ip_address)
        Search.create(user_ip_address: user_ip_address, query: final_query, completed: true)
        @incomplete_searches.destroy_all
        render json: { status: '200' }
    end

end