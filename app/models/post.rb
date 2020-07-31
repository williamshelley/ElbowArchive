class Post < ApplicationRecord
    validates :author_id, :wall_id, presence: true
    validates :body, presence: true, length: { minimum: 1 }

    belongs_to :author, class_name: :User
    belongs_to :wall, class_name: :User

    # has_many :comments
    # has_many :likes
end
