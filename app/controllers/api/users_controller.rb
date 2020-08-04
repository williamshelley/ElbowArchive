class Api::UsersController < ApplicationController
    def index
        start_of_name = params[:filters][:name] ? params[:filters][:name] : ""
        @users = User
                    .includes(
                        :profile_photo_attachment,
                        :cover_photo_attachment)
                    .select("*")
                    .where("CONCAT(first_name, ' ', last_name) LIKE ?%", start_of_name)

        render :index
    end

    def show
        @user = User.includes(
                        :profile_photo_attachment,
                        :cover_photo_attachment)
                    .find_by(id: params[:id])

        render :show
    end

    def create
        debugger
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
        params.require(:user).permit(:first_name, :last_name, :email, :password, :phone_number, :gender, :birth_date, :profile_photo, :cover_photo)
    end
end