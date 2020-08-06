class Api::PostsController < ApplicationController
    def index
        user_id = params[:user_id]
        @posts = []
        
        if user_id.scan(/\D/).empty?
            current_id = current_user.id
            if params[:newsfeed]
                friends = User
                .select("*")
                .joins(:sent_requests, :received_requests)
                .where("friend_requests.sender_id = ? OR friend_requests.recipient_id = ?", current_id, current_id)
                .where("friend_requests.accepted = TRUE")
                
                # friend_ids = current_user.friends.map { |friend| friend.id }
                friend_ids = friends.map { |friend| friend.id }
                friend_ids << current_user.id
                @posts = Post
                    .includes(:author, :wall, :likes)
                    .select("*")
                    .where("author_id IN (?) OR wall_id IN (?)", friend_ids, friend_ids)
                    .with_attached_photos

            else

                @posts = Post
                    .includes(:author, :wall, :likes)
                    .select("*")
                    .where("posts.author_id = ? OR posts.wall_id = ?", user_id, user_id)
                    .with_attached_photos

            end
        end

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
