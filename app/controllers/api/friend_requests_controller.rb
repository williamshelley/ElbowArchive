class Api::FriendRequestsController < ApplicationController
    def create
        @user = Friend.new(user_id: self.id, friend_id: user.id)
        if @user.save
            # success
            render :show
        else
            # failure
            render json: @user.errors.full_messages, status: 404
        end
    end

    def update
        @user = Friend.find_by(user_id: user.id, friend_id: self.id)
        if @user.update(pending: false)
            # success
            render :show
        else
            # failure
            render json: @user.errors.full_messages, status: 404
        end
    end

    def destroy

    end
end
