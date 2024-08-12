// // import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';

// // const defaultOptions: DefaultOptions = {
// //   watchQuery: {
// //     fetchPolicy: 'no-cache',
// //     errorPolicy: 'ignore',
// //   },
// //   query: {
// //     fetchPolicy: 'no-cache',
// //     errorPolicy: 'all',
// //   },
// // }

// // const client = new ApolloClient({
// //   uri: 'http://localhost:8080/graphql', // GraphQL endpoint
// //   cache: new InMemoryCache(),
// //   defaultOptions,
// // });

// // export default client;
// import { ApolloClient, InMemoryCache, DefaultOptions, ApolloLink, HttpLink, from } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:8080/graphql',
// });

// const authLink = setContext(() => {
//   // Retrieve the token from local storage or another secure place
//   const token = localStorage.getItem('jwtToken');
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const defaultOptions: DefaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// };

// const client = new ApolloClient({
//   link: from([authLink, httpLink]),
//   cache: new InMemoryCache(),
//   defaultOptions,
// });

// export default client;
import { ApolloClient, InMemoryCache, DefaultOptions, ApolloLink, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
