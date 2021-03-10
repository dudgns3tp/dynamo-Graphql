import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { v1 as uuidv1 } from 'uuid';

import { dateNow } from '../modules/dateNow.js';
import { ApolloError } from 'apollo-server';

dotenv.config();

dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const boardSchema = new dynamoose.Schema(
    {
        _id: {
            type: String,
            hashKey: true,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
            rangeKey: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: { type: String, default: dateNow() },
        updatedAt: { type: String, default: dateNow() },
        label: {
            type: Set,
            schema: [String],
        },
        like: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: false,
    }
);
const Board = dynamoose.model('Board', boardSchema);

Board.methods.set('addBoard', async function (args) {
    const _id = uuidv1();
    const board = new Board({ _id, ...args });
    return await board.save();
});

Board.methods.set('getBoard', async function ({ _id, author }) {
    const board = await Board.get({ _id, author });
    return board;
});

Board.methods.set('deleteBoard', async function ({ _id, author }) {
    const board = await Board.delete({ _id, author });
    return board;
});

Board.methods.set('searchBoards', async function (args) {
    let findQuery = Board.scan().exec();
    let query;
    const { page, limit, sort, title, author, content, isMatched } = {
        page: args.page || 1,
        limit: args.limit || 5,
        sort: args.sort || 'seq',
        title: args.title,
        author: args.author,
        content: args.content,
        isMatched: args.isMatched || false,
    };

    return findQuery
        .then((boards) => boards)
        .catch(() => {
            throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
        });
});

export default Board;
