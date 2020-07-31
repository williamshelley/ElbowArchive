json.partial! "/api/shared/user", user: @user
# json.extract! @user, *@user.attributes.keys
# json.extract! @user, :id, :first_name, :last_name, :email, :phone_number,:birth_date, :gender, :profile_photo, :cover_photo