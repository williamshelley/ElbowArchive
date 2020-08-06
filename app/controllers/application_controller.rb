class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        self.current_user.reset_session_token!
        session[:session_token] = nil
    end

    def logged_in?
        !!self.current_user
    end

    def current_user
        @current_user ||= (User
        .includes(:profile_photo_attachment, :cover_photo_attachment)
        .find_by(session_token: session[:session_token]))
    end
end
