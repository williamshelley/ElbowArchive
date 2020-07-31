class User < ApplicationRecord
    validates :first_name, :last_name, length: { minimum: 1 }, presence: true
    validates :password_digest, :session_token, :birth_date, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    validates :email, :phone_number, uniqueness: true, presence: true, allow_nil: true
    validate :email_or_phone_number

    after_initialize :ensure_session_token!

    has_many :posts, foreign_key: :author_id

    attr_reader :password

    def email_or_phone_number
        self.email || self.phone_number
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

    # posts that this user can modify
    def modifiable_posts
        posts = Post
            .includes(:author)
            .includes(:wall)
            .select("*")
            .where("(posts.author_id = ?) OR (posts.wall_id = ?)", self.id, self.id)
            
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
