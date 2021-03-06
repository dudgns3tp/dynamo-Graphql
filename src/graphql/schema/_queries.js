import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        getBoard(BoardId: ID!, _id: String!): Board

        searchBoards(
            BoardId: ID!
            title: String
            author: String
            content: String
            lastKey: String
            limit: Int
            createdAt: Date
            like: Int
            sort: String
            isMatched: Boolean
            lastKeyValue: String
        ): [Board]

        getPagenationBoards(
            BoardId: ID!
            title: String
            author: String
            content: String
            limit: Int
            page: Int
            sort: String
            isMatched: Boolean
        ): [Board]

        getSearchCount(
            BoardId: ID!
            title: String
            author: String
            content: String
            isMatched: Boolean
        ): BoardCount
    }
`;

export default typeDefs;
