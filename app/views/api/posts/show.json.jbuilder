json.extract! @post, *@post.keys

json.likes do
    @post.likes.each do |like|
        json.set! like.user_id do
            json.extract! like, *like.keys
        end
    end
end

json.comments do
    @post.comments.each do |comment|
        json.set! comment.id do
            json.extract! comment, *comment.keys
            json.author do 
                json.extract! comment.user, :id, :first_name, :last_name
            end
        end
    end
end

json.author do
    json.extract! @post.author, *@post.author.keys
end

json.wall do 
    json.extract! @post.wall, *@post.wall.keys
end

json.photos do
    @post.photos.each do |p|
        url_for(p)
    end
end