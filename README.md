# FreeCodeCamp: Voting App in React

----
## User stories:

1. As an authenticated user, I can keep my polls and come back later to access them.
2. As an authenticated user, I can share my polls with my friends.
3. As an authenticated user, I can see the aggregate results of my polls.I can edit these recipes.
4. As an authenticated user, I can delete polls that I decide I don't want anymore.All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.
5. As an authenticated user, I can create a poll with any number of possible items.
6. As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
7. As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
8. As an authenticated user, if I don't like the options on a poll, I can create a new option.

----
## Built using

* Express for API backend
* MongoDB/Mongoose for poll and user database
* Passport for authentication
* React for front-end
* Semantic UI

----
## Clone

1. Clone repo
2. npm install
3. cd client && npm install && npm run build

In development you need to run both the express server and the react app.  Run npm start from the root folder and client folder in separate consoles.

### Environment variables
* MONGODB_URI
* SESSION_SECRET
* googleClientID
* googleClientSecret
* googleCallbackURL
* githubClientID
* githubClientSecret
* githubCallbackURL
