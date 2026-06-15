import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create Apollo Client to connect to Rick and Morty GraphQL API
// This client will be used by our useCharacters hook
export const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});
