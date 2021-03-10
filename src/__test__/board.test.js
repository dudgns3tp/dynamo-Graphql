/* eslint-disable no-undef */
import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../graphql/schema/index.js';
import resolvers from '../graphql/resolver/index.js';

const server = new ApolloServer({ typeDefs, resolvers });

const { query, mutate } = createTestClient(server);
let deleteObj;

test('get board', async () => {
    const GET_BOARD = gql`
        query {
            getBoard(_id: "603df6147047418c15bfe2d7") {
                _id
                author
            }
        }
    `;
    const {
        data: { getBoard },
    } = await query({ query: GET_BOARD });

    expect(getBoard).toEqual({ _id: '603df6147047418c15bfe2d7', author: '최영훈' });
});

test('create new Board', async () => {
    const CREATE_NEW_BOARD = gql`
        mutation($title: String!, $author: String!, $content: String!, $label: [label]) {
            addBoard(title: $title, author: $author, content: $content, label: $label) {
                _id
                title
                content
                author
                label
                createdAt
                updatedAt
                seq
                like
            }
        }
    `;
    const {
        data: { addBoard },
    } = await mutate({
        mutation: CREATE_NEW_BOARD,
        variables: {
            title: '테스트 코드로 작성한 게시글 입니다.',
            author: '최영훈',
            content: '테스트중',
            label: ['bug'],
        },
    });
    deleteObj = addBoard;
    expect(addBoard).toBeTruthy();
});

test('deleteBoard', async () => {
    const DELETE_BOARD = gql`
        mutation($_id: ID!) {
            deleteBoard(_id: $_id) {
                _id
                title
                author
                content
            }
        }
    `;

    const {
        data: { deleteBoard },
    } = await mutate({
        mutation: DELETE_BOARD,
        variables: {
            _id: deleteObj._id,
        },
    });
    expect(deleteBoard).toBeTruthy();
});

test('can not delete board', async () => {
    const DELETE_BOARD = gql`
        mutation($_id: ID!) {
            deleteBoard(_id: $_id) {
                _id
                title
                author
                content
            }
        }
    `;

    const {
        data: { deleteBoard },
    } = await mutate({
        mutation: DELETE_BOARD,
        variables: {
            _id: '603df67b7047418c15bfe2dd',
        },
    });
    expect(deleteBoard).toBeFalsy();
});

test('add Like', async () => {
    const GET_BOARD = gql`
        query {
            getBoard(_id: "603df6147047418c15bfe2d7") {
                like
            }
        }
    `;
    const {
        data: { getBoard },
    } = await query({ query: GET_BOARD });

    const ADD_LIKE = gql`
        mutation($_id: ID!) {
            addLike(_id: $_id) {
                like
            }
        }
    `;

    const {
        data: { addLike },
    } = await mutate({ mutation: ADD_LIKE, variables: { _id: '603df6147047418c15bfe2d7' } });
    expect(addLike.like).toEqual(getBoard.like + 1);
});

test('add disLike', async () => {
    const GET_BOARD = gql`
        query {
            getBoard(_id: "603df6147047418c15bfe2d7") {
                like
            }
        }
    `;
    const {
        data: { getBoard },
    } = await query({ query: GET_BOARD });

    const ADD_DISLIKE = gql`
        mutation($_id: ID!) {
            addDislike(_id: $_id) {
                like
            }
        }
    `;

    const {
        data: { addDislike },
    } = await mutate({ mutation: ADD_DISLIKE, variables: { _id: '603df6147047418c15bfe2d7' } });
    expect(addDislike.like).toEqual(getBoard.like - 1);
});
