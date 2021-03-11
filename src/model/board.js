import dynamoose from 'dynamoose';
import dotenv from 'dotenv';

import { dateNow } from '../modules/dateNow.js';

dotenv.config();

dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// const replaySchema = new dynamoose.Schema({
//     Id: {
//         type: String,
//         hashKey: true,
//     },
//     ReplayDateTime: {
//         type: Date,
//         rangeKey: true,
//     },
//     message: String,
//     postedBy: {
//         type: String,
//         index: {
//             global: true,
//             rangeKey: 'message',
//             name: 'PostedBy-Message-Index',
//             project: true,
//             throughput: 5,
//         },
//     },
// });
const boardSchema = new dynamoose.Schema(
    {
        _id: {
            type: String,
            hashKey: true,
        },
        range: {
            type: String,
            rangeKey: true,
            index: [
                {
                    global: true,
                    rangeKey: 'createdAt',
                    name: 'rangeDate-createdAt-index',
                    project: true,
                    throughput: 5,
                },
                {
                    global: true,
                    rangeKey: 'like',
                    name: 'rangeLike-like-index',
                    project: true,
                    throughput: 5,
                },
            ],
        },
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        content: {
            type: String,
        },
        createdAt: {
            type: String,
            default: dateNow(),
        },
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
        saveUnknown: true,
        timestamps: false,
    }
);
const Board = dynamoose.model('Board', boardSchema);
export default Board;
