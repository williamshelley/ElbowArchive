class Like < ApplicationRecord
    validates :user_id, presence: true
    belongs_to :likeable, polymorphic: true
    belongs_to :user

    validates :user_id, uniqueness: { scope: [:likeable_type, :likeable_id] }
end