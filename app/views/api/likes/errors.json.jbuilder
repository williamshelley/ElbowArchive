json.extract! @like.errors.messages, *(@like.errors.messages.keys.select do |k|
    !@like.errors.messages[k].empty?
end)