json.accepted do
    @friend_requests.each do |request|
        if request.accepted
            json.set! request.id do
                json.extract! request, *request.keys
            end
        end
    end
end

json.pending do
    @friend_requests.each do |request|
        unless request.accepted
            json.set! request.id do
                json.extract! request, *request.keys
            end
        end
    end
end

# json.friend @friend, *@friend.keys if @friend