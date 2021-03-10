import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { v1 as uuidv1 } from 'uuid';

import { dateNow } from '../modules/dateNow.js';

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
            required: true,
        },
        title: {
            type: String,
            rangeKey: true,
            required: true,
        },
        author: {
            type: String,
            required: true,
            hashKey: true,
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
        like: { type: Number, default: 0 },
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

export default Board;
