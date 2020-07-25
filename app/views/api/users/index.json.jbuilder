@users.each do |user|
    json.set! user.id do 
        json.partial! "/api/shared/user", user: user
    end
end