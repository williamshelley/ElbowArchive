json.extract! user, *user.keys

json.profile_photo user.profile_photo.attached? ? url_for(user.profile_photo) : nil
json.cover_photo user.cover_photo.attached? ? url_for(user.cover_photo) : nil

# json.timeline_posts do
#     user.timeline_posts.each do |post|
#         json.set! post.id do
#             json.extract! post, *post.keys

#             json.photos do
#                 post.photos.each do |photo|
#                     json.set! photo.id do
#                         json.src url_for(photo)
#                     end
#                 end
#             end
            
#             json.author do
#                 json.extract! post.author, *post.author.keys
#             end
            
#             json.wall do 
#                 json.extract! post.wall, *post.wall.keys
#             end
#         end
#     end
# end