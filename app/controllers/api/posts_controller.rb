class Api::PostsController < ApplicationController
    def index
        user_id = params[:user_id]

        @posts = Post
            .includes(:author, :wall, :likes)
            .select("*")
            .where("posts.author_id = ? OR posts.wall_id = ?", user_id, user_id)
            .with_attached_photos
        render :index
    end

    def show
        @post = Post
            .includes(:author, :wall, :likes, :user)
            .with_attached_photos
            .find_by(id: params[:id])
        render :show
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

    def update
        @post = Post.find_by(id: params[:id]).with_attached_photos
        if @post.update(post_params)
            render :show
        else
            render :errors, status: 404
        end
    end

    def destroy

    end

    private
    def post_params
        params.require(:post).permit(:body, :date_posted, :wall_id, photos: [])
    end

end
