import "./App.css";
import React from "react";
import * as ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navigation from "./components/Navigation";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

let keys = ["a", "b"];




// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  // return (
  //   <div>
  // {keys?.map((key) => (
  //       <li></li>
  //     ))}
  //   </div>
  // )

  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
