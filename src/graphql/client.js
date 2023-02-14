import { 
  ApolloClient,  
  InMemoryCache, 
  // createHttpLink 
} from "@apollo/client";
// import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";

const token = "ZXT0pD6VAzTSFvostnZnrCTT6KAa1VeX6utME0EG51uMUNwJ10yAkqrdoBKu91mB";

// const authLink = setContext((_, { headers }) => {
//   return {
//   headers: {
//         ...headers, 
//         'x-hasura-admin-secret': `ZXT0pD6VAzTSFvostnZnrCTT6KAa1VeX6utME0EG51uMUNwJ10yAkqrdoBKu91mB`
//       }
//     }
//   });

  // const httpLink = createHttpLink({
  //   uri: 'https://expert-mammoth-86.hasura.app/v1/graphql',
  //  });
  
  const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: new WebSocketLink({
      uri: "wss://expert-mammoth-86.hasura.app/v1/graphql",
      options: {
        connectionParams: {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": `${token}`
          },
        },
        reconnect: true,
      },
    }),
    cache: new InMemoryCache()
  });


export default client;