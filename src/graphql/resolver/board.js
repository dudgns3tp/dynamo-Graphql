import { v1 as uuidv1 } from 'uuid';
import Board from '../../service/board.js';
import { dateNow } from '../../modules/dateNow.js';

const resolvers = {
    Query: {
        getBoard: async (_, args) => await Board.getBoard(args), // 완료, request 필드 author 추가.
        searchBoards: (_, args) => Board.searchBoards(args), // 완료
        getSearchCount: (_, args) => Board.searchCount(args), //완료
    },
    Mutation: {
        addBoard: async (_, args) => {
            return await Board.addBoard(
                Object.assign(args, {
                    BoardId: 'Board1',
                    _id: uuidv1(),
                    createdAt: dateNow(),
                    updatedAt: dateNow(),
                })
            );
        }, //완료
        deleteBoard: (_, args) => Board.deleteBoard(args), //완료
        updateBoard: async (_, args) => {
            const primaryKey = Object.assign({ _id: args._id, BoardId: 'Board1' });
            delete args._id;
            const updateItem = Object.assign(args, {
                updatedAt: dateNow(),
            });
            return await Board.updateBoard({ primaryKey, updateItem });
        },
        addLike: (_, args) => Board.addLike(args), //완료
        addDislike: (_, args) => Board.addDislike(args), //완료
    },
};

export default resolvers;
