import { gql } from 'apollo-server';

const typeDefs = gql`
    enum label {
        bug
        documention
        enhancement
        duplicate
        help_wanted
        question
        good_first_issue
    }

    enum sortingTypes {
        like
        dislike
        asc
        desc
    }
`;

export default typeDefs;
