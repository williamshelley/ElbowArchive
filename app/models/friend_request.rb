class FriendRequest < ApplicationRecord
    validates :sender_id, :recipient_id, :accepted, presence: true

    validates :sender_id, exclusion: { in: ->(user) { [user.recipient_id] } }
    validates :recipient_id, exclusion: { in: ->(user) { [user.sender_id] } }

    belongs_to :sender, class_name: :User
    belongs_to :recipient, class_name: :User
end
