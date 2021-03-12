import dynamoose from 'dynamoose';
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
    let Query;

    let condition = new dynamoose.Condition().where('BoardId').eq('Board1');
    condition = validParameters({ condition, title, author, content, isMatched });
    Query = Board.query(condition);
    Query = lastKey._id === undefined ? Query : Query.startAt(lastKey).limit(limit);
    Query = sortingType({ Query, sort });
    const board = await Query.exec();
    return board;
};

const addLike = async (args) => {
    return Board.get(args).then((board) => {
        ++board.like;
        return board.save();
    });
};

const addDislike = async (args) => {
    return Board.get(args).then((board) => {
        --board.like;
        return board.save();
    });
};
export default { addBoard, getBoard, deleteBoard, searchBoards, addLike, addDislike };
