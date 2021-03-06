class User < ApplicationRecord
    validates :first_name, :last_name, length: { minimum: 1 }, presence: true
    validates :password_digest, :session_token, :birth_date, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    validates :email, :phone_number, presence: true, uniqueness: true, allow_nil: true
    validate :email_or_phone_number

    after_initialize :ensure_session_token!

    has_many :posts, foreign_key: :author_id
    has_many :photos,
        through: :posts,
        source: :photos_attachments
    
    has_one_attached :profile_photo
    has_one_attached :cover_photo

    # has_many :friend_requests

    has_many :sent_requests,
        foreign_key: :sender_id,
        class_name: :FriendRequest
    
    has_many :received_requests,
        foreign_key: :recipient_id,
        class_name: :FriendRequest

    has_many :friends_as_sender, 
        through: :sent_requests, 
        source: :recipient

    has_many :friends_as_recipient, 
        through: :received_requests, 
        source: :sender

    attr_reader :password

    def self.seed_to_demo
        demo_user_number = SecureRandom::urlsafe_base64
        name = Faker::Movies::HarryPotter.character.split(" ")
        user = User.create!(
            first_name: name.first,
            last_name: name.last,
            email: "#{name.first}.#{name.last}.#{demo_user_number}@gmail.com", 
            phone_number: nil, 
            password: "password",
            birth_date: Faker::Date.between(from: '1980-01-10', to: '2020-01-10'),
            gender: "")

        post = Post.create!(
            author_id: user.id,
            wall_id: user.id,
            body: "This is a demo account. Please use it responsibly.",
            date_posted: DateTime.now)

        user
    end

    def friends
        User.select("*")
        .joins("JOIN friend_requests ON friend_requests.sender_id = users.id")
        .where("friend_requests.accepted AND friend_requests.sender_id = ? OR friend_requests.recipient_id = ?", self.id, self.id)
    end

    def email_or_phone_number
        if !self.email && !self.phone_number
            errors.add("Email and Phone Number cannot both be blank or invalid")
        end
    end

    def get_friend(user_id)
        requests = FriendRequest.select("*")
        .where("sender_id = ? OR recipient_id = ?", user_id, user_id)
        .where("sender_id = ? OR recipient_id = ?", self.id, self.id)

        request = requests.first
        if request
            request.accepted ? User.find_by_id(user_id) : nil
        else
            nil
        end
    end

    def self.find_by_credentials(credentials)
        email = credentials[:email]
        phone_number = credentials[:phone_number]
        password = credentials[:password]
        if email
            user = User.find_by(email: email)
        elsif phone_number
            user = User.find_by(phone_number: phone_number)
        end
        return user if user && user.is_password?(password)
        nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save
        self.session_token
    end

    def ensure_session_token!
        self.session_token || self.reset_session_token!
    end
end
