import Board from '../../model/board.js';

const resolvers = {
    Query: {
        getBoard: async (_, args) => await Board.getBoard(args), // 완료, request 필드 author 추가.
        searchBoards: (_, args) => Board.searchBoards(args),
        getSearchCount: (_, args) => Board.searchCount(args),
    },
    Mutation: {
        addBoard: async (_, args) => await Board.addBoard(args), //완료
        deleteBoard: (_, args) => Board.deleteBoard(args), //완료
        updateBoard: (_, args) => Board.updateBoard(args),
        addLike: (_, args) => Board.addLike(args),
        addDislike: (_, args) => Board.addDislike(args),
    },
};

export default resolvers;
