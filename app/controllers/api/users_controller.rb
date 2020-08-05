class Api::UsersController < ApplicationController
    def index
        @users = [current_user]
        
        # if filter_params
        #     if filter_params[:page_owner_id]
        #         @users << User.includes(:profile_photo_attachment,:cover_photo_attachment)
        #         .find_by_id(filter_params[:page_owner_id])
        #     end

        #     if filter_params[:user_ids]
        #         @users += User
        #         .includes(:profile_photo_attachment, :cover_photo_attachment)
        #         .select("*")
        #         .where("id IN (?)", filter_params[:user_ids])
                
        #     elsif filter_params[:name]
        #         start_of_name = filter_params[:name] ? filter_params[:name] : ""
        #         @users += User
        #         .includes(:profile_photo_attachment, :cover_photo_attachment)
        #         .select("*")
        #         .where("CONCAT(first_name, ' ', last_name) LIKE ?%", start_of_name)
                
        #     elsif filter_params[:all_users]
        #         @users = User.includes(:profile_photo_attachment,:cover_photo_attachment).all
        #     end
        # end

        render :index
    end

    def show
        @user = User
            .includes(:profile_photo_attachment, :cover_photo_attachment)
            .find_by(id: params[:id])

        render :show
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
        params.require(:user).permit(:first_name, :last_name, :email, :password, :phone_number, :gender, :birth_date, :profile_photo, :cover_photo)
    end

    def filter_params
        params.require(:filters).permit(:name, :all_users, :page_owner_id, user_ids: [])
    end
end