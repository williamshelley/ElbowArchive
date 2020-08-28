json.partial! "/api/shared/user", user: @user
json.photos @user.photos ? @user.photos.map { |photo| url_for(photo) } : nil
# json.friends @user.friends