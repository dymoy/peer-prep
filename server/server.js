/* Require npm packages  */
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

/* Require local src files for Apollo Server  */
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers
});

/* Create a new instance of an Apollo server with the GraphQL schema */
const startApolloServer = async () => {
	await server.start();
	
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use('/graphql', expressMiddleware(server, {
		context: authMiddleware
	}));
	
	if (process.env.NODE_ENV === 'production') {
		// In prod, we no longer need to use vite dev server. We serve the React app that is in the dist/ dir.
	  	app.use(express.static(path.join(__dirname, '../client/dist')));

		// Set up the wildcard route on our server since React app will handle its own routing
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	}

	db.once('open', () => {
		app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
		});
	});
}

/* Call the async function to start the server */
startApolloServer();
