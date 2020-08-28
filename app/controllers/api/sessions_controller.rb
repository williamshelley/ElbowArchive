class Api::SessionsController < ApplicationController
    def create


        if params[:user][:demo_user]
            @user = User.seed_to_demo
        else
            @user = User.find_by_credentials(email: params[:user][:email], phone_number: params[:user][:phone_number], password: params[:user][:password])
        end

        if @user
            login!(@user)
            render :show
        else
            render :errors, status: 404
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
