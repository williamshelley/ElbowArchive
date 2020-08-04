class FriendRequest < ApplicationRecord
    validates :sender_id, :recipient_id, presence: true

    validate :sender_is_not_recipient
    validate :unique_combination, on: :create
    
    belongs_to :sender, class_name: :User
    belongs_to :recipient, class_name: :User

    def self.find_by_user_id(user_id) 
        FriendRequest.select("*")
        .where("sender_id = ? OR recipient_id = ?", user_id, user_id)
    end

    def sender_is_not_recipient
        if self.sender_id == self.recipient_id
            errors.add(:base, "Sender and recipient cannot be the same.")
        end
    end

    def unique_combination
        combination = FriendRequest.select("*")
            .where("sender_id = ? OR sender_id = ?", self.sender_id, self.recipient_id)
            .where("recipient_id = ? OR recipient_id = ?", self.sender_id, self.recipient_id)

        if combination.size > 0
            errors.add(:base, "Same request cannot be made.")
        end
    end
end
