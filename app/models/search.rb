class Search < ApplicationRecord
    #Method to retrieve incomplete searches based on a user's IP address
    def self.incomplete_search(ip_address)
        self.where(user_ip_address: ip_address, completed: false)
    end
    
    #Method to retrieve a user's ranked query history based on their IP address
    def self.search_history(ip_address)
        self.where(user_ip_address: ip_address, completed: true)
            .select('query, COUNT(query) as query_count')
            .group(:query)
            .order('query_count DESC')
    end
end
