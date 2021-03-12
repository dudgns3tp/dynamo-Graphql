const sortingType = function ({ sort, Query }) {
    let query = Query;

    if (sort === 'recent') query = query.sort('descending').using('createdAt-index');
    else query = query.sort('aescending').using('createdAt-index');

    return query;
};
export default { sortingType };
export { sortingType };
