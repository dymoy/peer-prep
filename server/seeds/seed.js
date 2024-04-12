const db = require('../config/connection');
const { User, Session, Post } = require('../models');
const userData = require('./userData.json');
const sessionData = require('./sessionData.json');
const postData = require('./postData.json');
const cleanDB = require('./cleanDB');

// Initialize database seeding function once the app is open
db.once('open', async () => {
    try {
        await cleanDB('Session', 'sessions');

        await cleanDB('Post', 'posts');

        await cleanDB('User', 'users');

        //Bulk create each model
        await User.create(userData);
        await Session.create(sessionData);
        await Post.create(postData);

// Step 1: Assign each session to one user's 'session' array

        // 1a: Assign first session to first user's 'session' array
        User.findOneAndUpdate(
          {"username": "joesmith123"},
          {$push: {sessions: "How to ace a coding exam"}}
        )

        // 1b: Assign second session to second user's 'session' array
        User.findOneAndUpdate(
          {"username": "bobjones45"},
          {$push: {sessions: "MERN Stack Essentials"}}
        )

        // 1c: Assign third session to third user's 'session' array
        User.findOneAndUpdate(
          {"username": "taylorswift"},
          {$push: {sessions: "No thanks NoSQL"}}
        )

// Step 2: Assign a user to each session's 'host' property (inverse of step 1)

        // 2a: Assign related user to first session's 'host' property
        Session.findOneAndUpdate(
          {"title:": "How to ace a coding exam"},
          {$push: {host: "joesmith123"}}
        )

        // 2b: Assign related user to second session's 'host' property
        Session.findOneAndUpdate(
          {"title:": "MERN Stack Essentials"},
          {$push: {host: "bobjones45"}}
        )

        // 3c: Assign related user to third session's 'host' property
        Session.findOneAndUpdate(
          {"title:": "No thanks NoSQL"},
          {$push: {host: "taylorswift"}}
        )
      

// Step 3: Assign each post to one user's 'posts' array

        // 3a: Assign first post to first user's 'posts' array
        User.findOneAndUpdate(
          {"username": "joesmith123"},
          {$push: {posts: "How to create a for loop"}}
        )

        // 3b: Assign second post to second user's 'posts' array
        User.findOneAndUpdate(
          {"username": "bobjones45"},
          {$push: {posts: "How to install MySQL"}}
        )

        // 3c: Assign third post to third user's 'posts' array
        User.findOneAndUpdate(
          {"username": "taylorswift"},
          {$push: {posts: "CSS is a mess"}}
        )

        // 3d: Assign fourth post to fourth user's 'posts' array
        User.findOneAndUpdate(
          {"username": "georgejungle"},
          {$push: {posts: "JQuery Help"}}
        )

// Step 4: Assign a user to each post's 'author' property (inverse of step 3)

        // 4a: Assign related user to first session's 'host' property
        Post.findOneAndUpdate(
          {"title": "How to create a for loop"},
          {$push: {author: "joesmith123"}}
        )

        // 4b: Assign related user to second session's 'host' property
        Post.findOneAndUpdate(
          {"title": "How to install MySQL"},
          {$push: {author: "bobjones45"}}
        )

        // 4c: Assign related user to first session's 'host' property
        Post.findOneAndUpdate(
          {"title": "CSS is a mess"},
          {$push: {author: "taylorswift"}}
        )

        // 4d: Assign related user to first session's 'host' property
        Post.findOneAndUpdate(
          {"title": "JQuery Help"},
          {$push: {author: "georgejungle"}}
        )
        
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('all done!');
  process.exit(0);
});





