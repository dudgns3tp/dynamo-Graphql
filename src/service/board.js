import dynamoose from 'dynamoose';
import { ApolloError } from 'apollo-server';

import Board from '../model/board.js';
import { validParameters } from '../util/validParameters.js';
import { sortingType } from '../util/sortingType.js';

const addBoard = async (args) => {
    return new Board(args).save();
};

const getBoard = async ({ BoardId, _id }) => {
    const board = await Board.get({ BoardId, _id });
    return board;
};

const deleteBoard = async (args) => {
    try {
        await Board.delete(args);
        return true;
    } catch {
        return false;
    }
};

const searchBoards = async (args) => {
    const { lastKey, limit, sort, title, author, content, isMatched } = {
        lastKey: { _id: args.lastKey, BoardId: 'Board1' },
        limit: args.limit || 5,
        sort: args.sort || 'seq',
        title: args.title,
        author: args.author,
        content: args.content,
        isMatched: args.isMatched || false,
    };
    try {
        let Query;
        let condition = new dynamoose.Condition().where('BoardId').eq('Board1');
        condition = validParameters({ condition, title, author, content, isMatched });
        Query = Board.query(condition);
        Query = lastKey._id === undefined ? Query : Query.startAt(lastKey).limit(limit);
        Query = sortingType({ Query, sort });
        const board = await Query.exec();
        return board;
    } catch {
        throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
    }
};

const searchCount = async (args) => {
    const { title, author, content, isMatched } = {
        title: args.title,
        author: args.author,
        content: args.content,
        isMatched: args.isMatched || false,
    };
    try {
        let Query;
        let condition = new dynamoose.Condition().where('BoardId').eq('Board1');
        condition = validParameters({ condition, title, author, content, isMatched });
        Query = Board.query(condition);
        return await Query.count().exec();
    } catch {
        throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
    }
};

const addLike = async (args) => {
    return Board.get(args)
        .then((board) => {
            ++board.like;
            return board.save();
        })
        .catch(() => {
            throw new ApolloError('failed like', 'INTERNER_SERVER_ERROR');
        });
};

const addDislike = async (args) => {
    return Board.get(args)
        .then((board) => {
            --board.like;
            return board.save();
        })
        .catch(() => {
            throw new ApolloError('Failed disLike', 'INTERNER_SERVER_ERROR');
        });
};

const updateBoard = async ({ primaryKey, updateItem }) => {
    return Board.update(primaryKey, { $SET: updateItem })
        .then((result) => result)
        .catch(() => {
            throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
        });
};

export default {
    addBoard,
    getBoard,
    deleteBoard,
    searchBoards,
    addLike,
    addDislike,
    searchCount,
    updateBoard,
};
