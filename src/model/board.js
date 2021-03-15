import dynamoose from 'dynamoose';
import dotenv from 'dotenv';

dotenv.config();

dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const boardSchema = new dynamoose.Schema(
    {
        BoardId: {
            type: String,
            hashKey: true,
        },
        _id: {
            type: String,
            rangeKey: true,
        },
        title: {
            type: String,
            index: {
                name: 'title-index',
                rangeKey: 'title',
                throughput: { read: 5, write: 5 },
            },
        },
        author: {
            type: String,
            index: {
                name: 'author-index',
                rangeKey: 'author',
                throughput: { read: 5, write: 5 },
            },
        },
        content: {
            type: String,
            index: {
                name: 'content-index',
                rangeKey: 'content',
                throughput: { read: 5, write: 5 },
            },
        },
        updatedAt: { type: String },
        createdAt: {
            type: String,
            index: {
                name: 'createdAt-index',
                rangeKey: 'createdAt',
                throughput: { read: 5, write: 5 },
            },
        },
        label: {
            type: Set,
            schema: [String],
        },
        like: {
            type: Number,
            default: 0,
            index: {
                name: 'like-index',
                rangeKey: 'like',
                throughput: { read: 5, write: 5 },
            },
        },
    },
    {
        saveUnknown: true,
        timestamps: false,
    }
);
const Board = dynamoose.model('Board', boardSchema);
export default Board;
