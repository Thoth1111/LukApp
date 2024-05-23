class SearchesController < ApplicationController

    def index
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
        incomplete_searches = Search.where(user_ip_address: user_ip_address, completed: false)
        Search.create(user_ip_address: user_ip_address, query: final_query, completed: true)
        incomplete_searches.destroy_all
        render json: { status: '200' }
    end

end