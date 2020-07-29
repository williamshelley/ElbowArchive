json.extract! @user.errors.messages, *(@user.errors.messages.keys.select do |k|
    !@user.errors.messages[k].empty?
end)
json.username @username_errors if @username_errors