class User < ApplicationRecord
    validates :first_name, :last_name, length: { minimum: 1 }, presence: true
    validates :password_digest, :session_token, :birth_date, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    validates :email, :phone_number, uniqueness: true, presence: true, allow_nil: true
    validate :email_or_phone_number

    after_initialize :ensure_session_token!

    has_many :posts, foreign_key: :author_id
    
    has_one_attached :profile_photo
    has_one_attached :cover_photo

    # has_many :friends
    # has_many :friended, 
    #     through: :friends,
    #     source: :friend

    # has_many :friended_by,
    #     through: :friends,
    #     source: :user

    has_many :friend_requests

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

    def friends
        self.friends_as_recipient + self.friends_as_sender
    end

    def pending_requests
        
    end

    def email_or_phone_number
        self.email || self.phone_number
    end

    # def send_friend_request(user)
    #     friend = Friend.new(user_id: self.id, friend_id: user.id)
    #     if friend.save
    #         # success
    #     else
    #         # failure
    #     end
    # end

    # def accept_friend_request(user)
    #     request = Friend.find_by(user_id: user.id, friend_id: self.id)
    #     if request.update(pending: false)
    #         # success
    #     else
    #         # failure
    #     end
    # end

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

    # def newsfeed_posts
        # where a user has posted or has been posted on
        # where a user's friend has posted or has been posted on
    # end

    def timeline_posts
        posts = Post
            .includes(:wall, :author, :photos_attachments)
            .select('*')
            .where("(posts.wall_id = ?) OR (posts.author_id = ?)", self.id, self.id)

        posts
    end

    def editable_posts
        posts = Post
            .includes(:author, :photos_attachments)
            .select("*")
            .where("posts.author_id = ?", self.id)
            
        posts
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
