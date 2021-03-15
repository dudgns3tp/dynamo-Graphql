import { gql } from 'apollo-server';

const typeDefs = gql`
    type Mutation {
        addBoard(
            BoardId: ID!
            title: String!
            author: String!
            content: String!
            label: [label]
        ): Board
        deleteBoard(BoardId: ID!, _id: String): [Board]
        updateBoard(
            BoardId: ID!
            _id: String
            title: String
            content: String
            label: [label]
        ): Board
        addLike(BoardId: ID!, _id: String): Board
        addDislike(BoardId: ID!, _id: String): Board
    }
`;

export default typeDefs;
