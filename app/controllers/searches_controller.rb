class SearchesController < ApplicationController

    def index
        user_ip_address = request.remote_ip
        @search_history = Search.search_history(user_ip_address)
    end

    def create
        user_ip_address = request.remote_ip
        query = params[:query].downcase
        Search.create( user_ip_address: user_ip_address, query: query, completed: false)
        matching_searches = Search.where("query LIKE ?", "%#{query}%").where(completed: true).pluck(:query)
        render json: { status: '200', suggestions: matching_searches }
    end

    def resolve_queries
        user_ip_address = request.remote_ip
        final_query = params[:query].downcase
        @incomplete_searches = Search.incomplete_search(user_ip_address)
        saved_query = Search.find_by(query: final_query, user_ip_address: user_ip_address, completed: true)
        if saved_query
            saved_query.count += 1
            saved_query.save
            new_query = saved_query
        else
            new_query = Search.create(user_ip_address: user_ip_address, query: final_query, completed: true, count: 1)
        end
        @incomplete_searches.destroy_all
        render json: { status: '200', new_query: new_query }
    end

    def delete_incomplete_queries
        Search.delete_incomplete_queries
        render json: { status: '200' }
    end
end