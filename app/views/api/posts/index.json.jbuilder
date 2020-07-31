@posts.each do |post|
    json.set! post.id do
        json.extract! post, *post.attributes.keys
    end
end