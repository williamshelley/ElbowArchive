json.extract! user, *user.keys

json.profile_photo user.profile_photo.attached? ? url_for(user.profile_photo) : nil
json.cover_photo user.cover_photo.attached? ? url_for(user.cover_photo) : nil