const sortingType = function ({ sort, Query }) {
    let query = Query;

    if (sort === 'recent') query = query.sort('ascending');
    else query = query.sort('descending');

    return query;
};
export default { sortingType };
export { sortingType };
