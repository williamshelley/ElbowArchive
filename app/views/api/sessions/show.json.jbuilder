# json.partial! "../shared/user", user: @user
# json.extract! @user, *@user.attributes.keys
json.extract! @user, :id, :first_name, :last_name, :profile_img_url, :gender, :email, :phone_number