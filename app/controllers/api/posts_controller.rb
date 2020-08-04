class Api::PostsController < ApplicationController
    def index
        user_id = params[:user_id]

        @posts = Post
            .includes(:author, :wall, :photos_attachments)
            .select("*")
            .where("posts.author_id = ? OR posts.wall_id = ?", user_id, user_id)

        render :index
    end

    def show
        @post = Post.includes(:photos_attachments, :author, :wall).find_by(id: params[:id])
        render :show
    end

    def destroy

    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id
        if @post.save
            render :show
        else
            render :errors, status: 404
        end
    end

    private
    def post_params
        params.require(:post).permit(:body, :date_posted, :wall_id, photos: [])
    end

end
