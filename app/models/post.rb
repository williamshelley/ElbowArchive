class Post < ApplicationRecord
    validates :author_id, :wall_id, :date_posted, presence: true
    validates :body, presence: true, length: { minimum: 1 }

    belongs_to :author, class_name: :User
    belongs_to :wall, class_name: :User

    has_many_attached :photos

    has_many :likes, as: :likeable

    has_many :users_who_liked, dependent: :destroy,
        through: :likes,
        source: :user

    
end
