class Api::CommentsController < ApplicationController
    def create
        @comment = Comment.includes(:user).new(comment_params)
        @comment.user_id = current_user.id

        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 404
        end
    end

    def destroy

    end

    def update
        @comment = Comment
            .includes(:user, :comments, :likes)
            .find_by(id: params[:id])
            .with_attached_photos

        if @comment.update(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 404
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :commentable_type, :commentable_id)
    end
end
