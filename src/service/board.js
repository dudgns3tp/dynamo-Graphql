import { ApolloError } from 'apollo-server';
import dynamoose from 'dynamoose';
import Board from '../model/board.js';
import { sortingType } from '../util/sortingTypeMap.js';

const addBoard = async ({ _id, title, author, content, label, colA }) => {
    return new Board({ _id, title, colA, author, content, label }).save();
};

const getBoard = async ({ _id, author }) => {
    const board = await Board.get({ _id, author });
    return board;
};

const deleteBoard = async ({ _id, author }) => {
    const board = await Board.delete({ _id, author });
    return board;
};

const searchBoards = async (args) => {
    const { lastKey, limit, sort, title, author, content, isMatched } = {
        lastKey: args.lastKey,
        limit: args.limit || 3,
        sort: args.sort || 'seq',
        title: args.title,
        author: args.author,
        content: args.content,
        isMatched: args.isMatched || false,
    };

    const sortingField = Object.assign(sortingType.get(sort));
    //let condition = new dynamoose.Condition().filter('title').eq(title);
    const board = await Board.scan().exec();
    return board;
};

const addLike = async ({ _id, author }) => {
    return Board.get({ _id, author }).then((board) => {
        ++board.like;
        return board.save();
    });
};

const addDislike = async ({ _id, author }) => {
    return Board.get({ _id, author }).then((board) => {
        --board.like;
        return board.save();
    });
};
export default { addBoard, getBoard, deleteBoard, searchBoards, addLike, addDislike };
