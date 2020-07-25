# json.partial! "../shared/user", user: @user
# json.extract! @user, *@user.attributes.keys
json.extract! @user, :id