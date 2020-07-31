class Api::UsersController < ApplicationController
    def index
        @users = User.all
        render :index
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            messages = @user.errors.messages
            combined = messages[:email] + messages[:phone_number]
            @username_errors = combined.empty? ? nil : combined
            render :errors, status: 404
        end
    end

    def update
        @user = current_user
        if @user.update(user_params) 
            render :show
        else
            messages = @user.errors.messages
            combined = messages[:email] + messages[:phone_number]
            @username_errors = combined.empty? ? nil : combined
            render :errors, status: 404
        end
    end

    private
    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :phone_number, :gender, :birth_date)
    end
end