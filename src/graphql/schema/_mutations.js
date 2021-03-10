import { gql } from 'apollo-server';

const typeDefs = gql`
    type Mutation {
        addBoard(title: String!, author: String!, content: String!, label: [label]): Board
        deleteBoard(_id: ID!): Board
        updateBoard(_id: ID!, title: String, content: String, label: [label]): Board
        addLike(_id: ID!): Board
        addDislike(_id: ID!): Board
    }
`;

export default typeDefs;
