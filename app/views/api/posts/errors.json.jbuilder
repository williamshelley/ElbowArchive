if @post
    json.extract! @post.errors.messages, *(@post.errors.messages.keys.select do |k|
        !@post.errors.messages[k].empty?
    end)
else
    json.error "Something went wrong in PostsController!";
end