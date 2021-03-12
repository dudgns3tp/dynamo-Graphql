import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        getBoard(BoardId: ID!, _id: String!): Board
        searchBoards(
            title: String
            author: String
            content: String
            lastKey: String
            limit: Int
            sort: sortingTypes
            isMatched: Boolean
        ): [Board]
        getSearchCount(
            title: String
            author: String
            content: String
            isMatched: Boolean
        ): BoardCount
    }
`;

export default typeDefs;
