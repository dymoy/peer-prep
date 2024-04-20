const db = require('../config/connection');
const { User, Session } = require('../models');
const userData = require('./userData.json');
const sessionData = require('./sessionData.json');
const cleanDB = require('./cleanDB');

// Initialize database seeding function once the app is open
db.once('open', async () => {
    try {
        await cleanDB('Session', 'sessions');
        await cleanDB('User', 'users');

        //Bulk create each model
        await User.create(userData);
        await Session.create(sessionData);

	// Step 1: Assign each session to one user's 'session' array
        // 1a: Assign first session to first user's 'session' array
        const codeExam = Session.findOne({ title: "How to ace a coding exam"} );

        User.findOneAndUpdate(
          {"username": "joesmith123"},
          {$push: {sessions: codeExam._id}}
        )

        // 1b: Assign second session to second user's 'session' array
        const mernStack = Session.findOne({ title: "MERN Stack Essentials" });

        User.findOneAndUpdate(
          {"username": "bobjones45"},
          {$push: {sessions: mernStack._id}}
        )

        // 1c: Assign third session to third user's 'session' array
        const noSql = Session.findOne({ title: "No thanks NoSQL"});

        User.findOneAndUpdate(
          {"username": "taylorswift"},
          {$push: {sessions: noSql._id}}
        )

	// Step 2: Assign a user to each session's 'host' property (inverse of step 1)

        // 2a: Assign related user to first session's 'host' property
        const joeUser = User.findOne({ username: "joesmith123"});

        Session.findOneAndUpdate(
          {"title:": "How to ace a coding exam"},
          {$push: {host: joeUser._id }}
        )

        // 2b: Assign related user to second session's 'host' property
        const bobUser = User.findOne({ username: "bobjones45" });

        Session.findOneAndUpdate(
          {"title:": "MERN Stack Essentials"},
          {$push: {host: bobUser._id }}
        )

        // 3c: Assign related user to third session's 'host' property
        const taylorUser = User.findOne({ username: "taylorswift" });
        Session.findOneAndUpdate(
          {"title:": "No thanks NoSQL"},
          {$push: {host: taylorUser._id }}
        )
  	} catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});
