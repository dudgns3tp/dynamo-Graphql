import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/resolver/index.js';
import typeDefs from './graphql/schema/index.js';
import formatError from './graphql/formatError.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
});

server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
