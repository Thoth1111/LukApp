class Search < ApplicationRecord
    validates :user_ip_address, presence: true
    validates :query, presence: true

    #Method to retrieve incomplete searches based on a user's IP address
    def self.incomplete_search(ip_address)
        self.where(user_ip_address: ip_address, completed: false)
    end
    
    #Method to retrieve a user's ranked query history based on count and IP address
    def self.search_history(ip_address)
        self.where(user_ip_address: ip_address, completed: true).order('count DESC')
    end
end
