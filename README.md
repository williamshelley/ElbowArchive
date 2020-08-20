# ElbowArchive

This is a clone of Facebook. It implements posting, commenting, liking, friending, searching for users, profile photo uploading, and posting photos.

[Link to live site](https://elbow-archive.herokuapp.com/#/)

ElbowArchive uses the Ruby on Rails framework for the backend, and it uses React and Redux for the frontend.



### Friends
- User can select ```Friend Requests``` and navigate to friend requests page (with profile modal on left)

| Friends Index |
| :---: |
| <img width="500" alt="friend-index" src="https://user-images.githubusercontent.com/38144750/90829490-d8d2e000-e30d-11ea-8af3-107960663d2f.png"> |


| Friend Requests Full Page | Friend Requests Sidebar |
| :---: | :---: |
| <img width="150" alt="friend-requests2" src="https://user-images.githubusercontent.com/38144750/90829486-d83a4980-e30d-11ea-9605-707e1e94d598.png"> | <img width="800" alt="friend-requests1" src="https://user-images.githubusercontent.com/38144750/90829489-d8d2e000-e30d-11ea-90f2-49f260ff1d69.png"> |

Implementing the friending system was a challenge. In this implementation, the slice of state 'friendRequests' holds 'accepted' and 'pending' requests. Based on the requests' 'sender_ids' and 'recipient_ids,' requests were made to the backend so that the 'users' slice of state was updated with the correct users.

| Edit Profile | Upload Photos |
| :---: | :---: |
| <img width="500" alt="edit-profile" src="https://user-images.githubusercontent.com/38144750/90829495-d96b7680-e30d-11ea-9344-f32cfde63bf2.png"> | <img width="500" alt="upload-photo" src="https://user-images.githubusercontent.com/38144750/90829492-d96b7680-e30d-11ea-87b9-40e228ab91be.png"> | 

### Posts
- User can make posts on their own or other users' timelines (cannot post directly to newsfeed *Feature to add*)
- User can like/unlike posts (likes are polymorphic, but comments cannot be liked yet *Feature to add*)
- User can comment on posts (comments are polymorphic, but no frontend ability to comment on comments exists yet *Feature to add*)
- User can post photos (uses AWS and Rails ActiveStorage)

| Timeline Post |
| :---: |
| <img width="500" alt="timeline-post" src="https://user-images.githubusercontent.com/38144750/90829497-da040d00-e30d-11ea-82ac-79596f3961df.png"> |

| Profile | Search for Users |
| :---: | :---: |
| <img width="800" alt="profile" src="https://user-images.githubusercontent.com/38144750/90829499-da040d00-e30d-11ea-838a-72fef2700267.png"> | <img width="300" alt="searchbar" src="https://user-images.githubusercontent.com/38144750/90829500-da9ca380-e30d-11ea-9046-ef799c05b696.png"> |

| Newsfeed |
| :---: |
| <img width="800" alt="newsfeed" src="https://user-images.githubusercontent.com/38144750/90829501-da9ca380-e30d-11ea-9e77-4397de29d622.png"> |


