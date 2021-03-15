import dynamoose from 'dynamoose';
import { ApolloError } from 'apollo-server';
import _ from 'lodash';

import Board from '../model/board.js';
import { sortingType, lastKeyType, validParameters } from '../util/boardUtil.js';

const addBoard = async ({ BoardId, title, author, content, label, _id, createdAt, updatedAt }) => {
    return new Board({ BoardId, title, author, content, label, _id, createdAt, updatedAt }).save();
};

const getBoard = async ({ BoardId, _id }) => {
    const board = await Board.get({ BoardId, _id });
    return board;
};

const deleteBoard = async ({ BoardId, _id }) => {
    try {
        const deletedBoard = await Board.delete({ BoardId, _id });
        return deletedBoard;
    } catch (err) {
        return err;
    }
};

const searchBoards = async ({ BoardId, lastKey, sort, title, author, content, isMatched }) => {
    try {
        let Query;
        let condition = new dynamoose.Condition().where('BoardId').eq(BoardId);
        condition = validParameters({ condition, title, author, content, isMatched });
        Query = Board.query(condition);
        Query = sortingType({ Query, sort });
        Query = _.isNil(lastKey._id) ? Query : Query.startAt(lastKeyType({ sort, lastKey }));
        const board = await Query.exec();
        return board.slice(0, 5);
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

const getBoardsByPage = async ({
    BoardId,
    limit,
    page,
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
        Query = sortingType({ Query, sort });
        const board = await Query.exec();
        return board.slice((page - 1) * limit, (page - 1) * limit + 5);
    } catch (err) {
        console.log(err);
    }
};

const addLike = async ({ BoardId, _id }) => {
    return Board.get({ BoardId, _id })
        .then((board) => {
            ++board.like;
            return board.save();
        })
        .catch((err) => {
            throw err;
        });
};

const addDislike = async ({ BoardId, _id }) => {
    return Board.get({ BoardId, _id })
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
    getBoardsByPage,
};
