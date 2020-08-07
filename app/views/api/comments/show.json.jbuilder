json.extract! @comment, *@comment.keys

json.author do 
    json.extract! @comment.user, :id, :first_name, :last_name
end