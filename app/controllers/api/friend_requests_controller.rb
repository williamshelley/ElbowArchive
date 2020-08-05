class Api::FriendRequestsController < ApplicationController
    def index
        # @friend_requests = []
        # @friend = nil

        # if params[:friend_ids]
        #     @friend_requests = FriendRequest.select("*")
        #     .where("sender_id IN (?) OR recipient_id IN (?)", params[:friend_ids])
        #     .where("sender_id = ? OR recipient_id = ?", current_user.id, current_user.id)
        # else
        user_id = params[:user_id] ? params[:user_id] : current_user.id
        # debugger
        @friend_requests = FriendRequest.find_by_user_id(user_id)
        # end
        # debugger
        render :index
    end
    
    def create
        @friend_request = FriendRequest.new(sender_id: current_user.id, recipient_id: request_params[:recipient_id])

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
            .find_by_user_id(request_params[:sender_id])
            .find_by(recipient_id: current_user.id)

        # debugger

            
        if @friend_request.update(accepted: true)
            # success
            render :show
        else
            # failure
            render json: @friend_request.errors.full_messages, status: 404
        end
    end

    # def destroy

    # end

    private
    def request_params
        params.require(:friend_request).permit(:recipient_id, :sender_id)
    end
end
