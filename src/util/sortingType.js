const sortingType = function ({ sort, Query }) {
    let query = Query;

    if (sort === 'desc') query = query.sort('descending').using('createdAt-index');
    else if (sort === 'like') query = query.sort('descending').using('like-index');
    else if (sort === 'dislike') query = query.sort('ascending').using('like-index');
    else if (sort === 'asc') query = query.sort('ascending').using('createdAt-index');

    return query;
};

const lastKeyType = function ({ sort, lastKey }) {
    if (sort === 'desc' || sort === 'asc') delete lastKey.like;
    else if (sort === 'like' || sort === 'dislike') delete lastKey.createdAt;
    else lastKey;
    return lastKey;
};

export default { sortingType, lastKeyType };
export { sortingType, lastKeyType };
