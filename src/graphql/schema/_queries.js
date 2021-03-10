import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        getBoard(_id: ID!): Board
        searchBoards(
            title: String
            author: String
            content: String
            page: Int
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
