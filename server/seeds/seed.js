const db = require('../config/connection');
const { User, Session, Post } = require('../models');
const userData = require('./userData.json');
const sessionData = require('./sessionData.json');
const postData = require('./postData.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Session', 'sessions');

        await cleanDB('Post', 'posts');

        await cleanDB('User', 'users');

//Bulk create each model
        await User.create(userData);
        await Session.create(sessionData);
        await Post.create(postData);
// Assign each session to one user's 'session' array
        // Assign first session to first user's 'session' array
        User.findOneAndUpdate(
          {"username": "joesmith123"},
          {$push: {sessions: "How to ace a coding exam"}}
        )
// Assign a user to each session's 'host' property
        // Assign this user to related session's 'host' property
        Session.findOneAndUpdate(
          {"title:": "How to ace a coding exam"},
          {$push: {host: "joesmith123"}}
        )
      //...do for remaining sessions

// Assign each post to one user's 'post' array
        User.findOneAndUpdate(
          {"username": "joesmith123"},
          {$push: {posts: "How to create a for loop"}}
        )
// Assign a user

// Assign a user to each post's 'author' property
        Post.findOneAndUpdate(
          {"title": "How to create a for loop"},
          {$push: {author: "joesmith123"}}
        )
      





