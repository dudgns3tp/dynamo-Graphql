import Board from '../../model/board.js';

const resolvers = {
    Query: {
        getBoard: async (_, args) => await Board.findOne(args),
        searchBoards: (_, args) => Board.searchBoards(args),
        getSearchCount: (_, args) => Board.searchCount(args),
    },
    Mutation: {
        addBoard: async (_, args) => await Board.addBoard(args), //완료
        deleteBoard: (_, args) => Board.deleteBoardById(args),
        updateBoard: (_, args) => Board.updateBoard(args),
        addLike: (_, args) => Board.addLike(args),
        addDislike: (_, args) => Board.addDislike(args),
    },
};

export default resolvers;
