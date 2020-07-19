# Facebook FSP

## Proposal
    Project: Facebook clone

    Summary: Facebook is a social media platform where users are able to post stories, comment on others' stories and comments, like posts information, friend and message other users, and post photos.

    Key features to implement:
    - Users should be able to make posts
    - Users should be able to comment on posts or other comments
    - Users should be able to like posts or comments
    - Users should be able to have photos in their posts/comments
    - Users should be able to search for other users
    - Users should be able to send and accept friend requests
    - Users should have a personal timeline/wall that can be posted to by friends or by themselves
    - Users should be able to view other users' timelines
    - Users should be able to view their own photos
    - There should be a News Feed where recent posts are gathered (newest are at the top)

---
<br>

### User
    - Sign up/in
    - Personal profile/wall/timeline page

### Friends/Groups
    - Requesting/Accepting friends

### Posts/Comments/Messages
    - Making posts
    - Commenting on posts/comments
    - Posting to friends' walls as the destination instead of News Feed

### News Feed
    - Main posts location
    - Display recent posts

<br><br>

## Schema

    users
    - has many friends
    - has many posts
    - has many comments
    - has many photos

| column name | data type | details |
| :--- | :----: | ---: |
| id | integer | not null, primary key |
| username | string | not null, indexed, unique |
| email | string | not null, indexed, unique |
| password_digest | string | not null |
| session_token | string | not null, indexed, unique |
| created_at | datetime | not null |
| updated_at | datetime | not null |

---
<br>

    posts
    - belongs to user (author)
    - has many comments
    - has many likes
    - has many photos

| column name | data type | details |
| :--- | :----: | ---: |
| id | integer | not null, primary key |
| author_id | integer | not null, indexed |
| body | text | not null |

- `author_id` references `users`

---
<br>

    comments
    - belongs to user (author)
    - belongs to post
    - belongs to comment (it may not also belong to a comment)
    - has many likes
    - has many comments
    - has many photos

| column name | data type | details |
| :--- | :----: | ---: |
| id | integer | not null, primary key |
| post_id | integer | not null, indexed |
| comment_id | integer | indexed |
| body | text | not null |

- `post_id` references `posts`
- `comment_id` references `comments`

---
<br>

    likes
    - belongs to author
    - belongs to likable (comment/post)
    - polymorphic

| column name | data type | details |
| :--- | :----: | ---: |
| id | integer | not null, primary key |
| author_id | integer | not null, indexed |
| likable_type | string | not null, indexed |
| likable_id | integer | not null, indexed |
- `likable_id` references `comments` or `posts`

---
<br>

    photos
    - belongs to user
    - belongs to imageable (comment/post)
    - polymorphic
    
| column name | data type | details |
| :--- | :----: | ---: |
| id | integer | not null, primary key |
| user_id | integer | not null, indexed |
| imageable_type | string | not null, indexed |
| imageable_id | integer | not null, indexed |
| url | string | not null |
- `imageable_id` references `comments` or `posts`