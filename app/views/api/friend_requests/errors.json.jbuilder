json.extract! @friend_request.errors.messages, *(@friend_request.errors.messages.keys.select do |k|
    !@friend_request.errors.messages[k].empty?
end)