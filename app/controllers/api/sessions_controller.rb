class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            email: params[:user][:email],
            phone_number: params[:user][:phone_number],
            password: params[:user][:password])

        if @user
            login!(@user)
            render :show
        else
            render json: ["Invalid email/phone number or password."], status: 404
        end
    end

    def destroy
        @user = current_user
        if @user
            logout!
        else
            render json: ["User not logged in."], status: 404
        end
    end
end
