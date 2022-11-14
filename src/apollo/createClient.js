import {
  ApolloClient,
  InMemoryCache,
  from as ApolloFrom,
} from "@apollo/client";
import {
  connectionLink,
} from './connectionLink';

//Apollo cashe
export const cache = new InMemoryCache();

export default function createClient() {
  const client = new ApolloClient({
    cache,
    link: ApolloFrom([connectionLink]),
  });
  return client;
}