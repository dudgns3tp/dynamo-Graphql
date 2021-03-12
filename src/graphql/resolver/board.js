import { v1 as uuidv1 } from 'uuid';
import Board from '../../service/board.js';
import { dateNow } from '../../modules/dateNow.js';

const resolvers = {
    Query: {
        getBoard: async (_, args) => await Board.getBoard(args),
        searchBoards: async (_, args) => {
            const { BoardId, lastKey, limit, sort, title, author, content, isMatched } = {
                BoardId: args.BoardId,
                lastKey: { _id: args.lastKey, BoardId: 'Board1' },
                limit: args.limit || 5,
                sort: args.sort || 'seq',
                title: args.title,
                author: args.author,
                content: args.content,
                isMatched: args.isMatched || false,
            };
            return await Board.searchBoards({
                BoardId,
                lastKey,
                limit,
                sort,
                title,
                author,
                content,
                isMatched,
            });
        },
        getSearchCount: async (_, args) => {
            const { BoardId, title, author, content, isMatched } = {
                BoardId: args.BoardId,
                title: args.title,
                author: args.author,
                content: args.content,
                isMatched: args.isMatched || false,
            };
            console.log(args);
            return await Board.searchCount({ BoardId, title, author, content, isMatched });
        },
    },
    Mutation: {
        addBoard: async (_, args) => {
            return await Board.addBoard(
                Object.assign(args, {
                    _id: uuidv1(),
                    createdAt: dateNow(),
                    updatedAt: dateNow(),
                })
            );
        },
        deleteBoard: async (_, args) => await Board.deleteBoard(args),
        updateBoard: async (_, args) => {
            const primaryKey = Object.assign({ _id: args._id, BoardId: args.BoardId });
            delete args._id;
            delete args.BoardId;
            const updateItem = Object.assign(args, {
                updatedAt: dateNow(),
            });
            return await Board.updateBoard({ primaryKey, updateItem });
        },
        addLike: async (_, args) => await Board.addLike(args),
        addDislike: async (_, args) => await Board.addDislike(args),
    },
};

export default resolvers;
