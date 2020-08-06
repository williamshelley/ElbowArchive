@posts.each do |post|
    json.set! post.id do
        json.extract! post, *post.keys

        json.likes do
            post.likes.each do |like|
                json.set! like.user_id do
                    json.extract! like, *like.keys
                end
            end
        end

        json.author do
            json.extract! post.author, *post.author.keys
        end

        json.wall do 
            json.extract! post.wall, *post.wall.keys
        end

        json.photos post.photos.map { |p| url_for(p) }
    end
end