class Api::PostsController < ApplicationController
    def index
        @posts = Post.all
        render :index
    end

    def show
        @post = Post.find_by(id: params[:id])
        render :show
    end

    def destroy

    end

    def create
        @post = Post.new(post_params)
        if @post.save
            render :show
        else
            render :errors, status: 404
        end
    end

    private
    def post_params
        params.require(:post).permit(:author_id, :body)
    end

end
