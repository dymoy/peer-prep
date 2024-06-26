import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";

/* Construct our main GraphQL API endpoint */
const httpLink = createHttpLink({
  	uri: '/graphql',
});

/* Construct request middleware that will attach the JWT token to every request as an `authorization` header */
const authLink = setContext((_, { headers }) => {
	// Get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');

	// Return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

/* Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API */
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Navigation />
			<Outlet />
		</ApolloProvider>
	);
}

export default App;
