class Api::LikesController < ApplicationController
    def create
        @like = Like.new(likeable_params)
        @like.user_id = current_user.id
        if @like.save
            render :show
        else
            render :errors, status: 404
        end
    end

    def destroy
        @like = Like
        .where(id: params[:id])
        .find_by(user_id: current_user.id)

        if @like
            @like.destroy
            render :show
        else
            render json: ["Something went wrong!"], status: 404
        end
    end

    private
    def likeable_params
        params.require(:likeable).permit(:likeable_id, :likeable_type)
    end

    def filter_params
        params.require(:filters).permit(:likeable_type, likeable_ids: [])
    end
end
