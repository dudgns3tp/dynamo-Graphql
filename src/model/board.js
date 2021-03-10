import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
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
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: { type: Date, default: dateNow() },
        updatedAt: { type: Date, default: dateNow() },
        label: [{ type: String, required: false }],
        like: { type: Number, default: 0 },
    },
    {
        timestamps: false,
    }
);

export default dynamoose.model('Board', boardSchema);
