json.extract! @post, *@post.keys

json.author do
    json.extract! @post.author, *@post.author.keys
end

json.wall do 
    json.extract! @post.wall, *@post.wall.keys
end

json.photos do
    @post.photos.map { |p| url_for(p) }
end