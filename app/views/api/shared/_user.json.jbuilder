json.extract! user, :id, :first_name, :last_name, :email, :phone_number,:birth_date, :gender, :profile_photo, :cover_photo

json.posts do
    user.modifiable_posts.each do |post|
        json.set! post.id do
            json.author do 
                json.extract! post.author, :first_name, :last_name, :profile_photo
            end

            json.wall do
                json.extract! post.wall, :first_name, :last_name, :profile_photo
            end
            json.extract! post, *post.attributes.keys
        end
    end
end