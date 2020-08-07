class Comment < ApplicationRecord
    belongs_to :commentable, polymorphic: true
    
    has_many :comments, as: :commentable, dependent: :destroy
    has_many :likes, as: :likeable, dependent: :destroy
    
    validates :user_id, presence: true
    belongs_to :user

    has_many_attached :photos
end
