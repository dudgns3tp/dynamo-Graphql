import dynamoose from 'dynamoose';
import { ApolloError } from 'apollo-server';
import _ from 'lodash';

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

const searchBoards = async ({
    BoardId,
    lastKey,
    limit,
    sort,
    title,
    author,
    content,
    isMatched,
}) => {
    try {
        let Query;
        let condition = new dynamoose.Condition().where('BoardId').eq(BoardId);
        condition = validParameters({ condition, title, author, content, isMatched });
        Query = Board.query(condition);
        Query = _.isNil(lastKey._id) ? Query : Query.startAt(lastKey);
        Query = sortingType({ Query, sort });
        const board = await Query.limit(limit).exec();
        return board;
    } catch (err) {
        console.log(err);
    }
};

const searchCount = async ({ BoardId, title, author, content, isMatched }) => {
    try {
        let Query;
        let condition = new dynamoose.Condition().where('BoardId').eq(BoardId);
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
    return Board.update(primaryKey, { $SET: updateItem }).then((result) => result);
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
