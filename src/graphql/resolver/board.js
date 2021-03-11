import Board from '../../service/board.js';
import { v1 as uuidv1 } from 'uuid';

const resolvers = {
    Query: {
        getBoard: async (_, args) => await Board.getBoard(args), // 완료, request 필드 author 추가.
        searchBoards: (_, args) => Board.searchBoards(args), // 페이지 네이션만..
        getSearchCount: (_, args) => Board.searchCount(args),
    },
    Mutation: {
        addBoard: async (_, args) => {
            args.colA = 'test';
            args._id = uuidv1();
            return await Board.addBoard(args);
        }, //완료
        deleteBoard: (_, args) => Board.deleteBoard(args), //완료
        updateBoard: (_, args) => Board.updateBoard(args),
        addLike: (_, args) => Board.addLike(args), //완료
        addDislike: (_, args) => Board.addDislike(args), //완료
    },
};

export default resolvers;
