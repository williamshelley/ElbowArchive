class Api::FriendRequestsController < ApplicationController
    def index
        # user_id = params[:user_id] ? params[:user_id] : current_user.id
        user_id = current_user.id
        @friend_requests = FriendRequest.find_by_user_id(user_id)
        render :index
    end
    
    def create
        # @friend_request = FriendRequest.new(sender_id: current_user.id, recipient_id: request_params[:recipient_id])
        @friend_request = FriendRequest.new(sender_id: current_user.id, recipient_id: 5)

        if @friend_request.save
            # success
            render :show
        else
            # failure
            render :errors, status: 404
        end
    end

    def update
        # accepting request
        @friend_request = FriendRequest
            .find_by_user_id(5)
            .find_by(recipient_id: 1)
            # .find_by_user_id(request_params[:sender_id])
            # .find_by(recipient_id: current_user.id)

        if @friend_request.update(accepted: true)
            # success
            render :show
        else
            # failure
            render json: @friend_request.errors.full_messages, status: 404
        end
    end

    private
    def request_params
        params.require(:friend_request).permit(:recipient_id, :sender_id)
    end
end
