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

const validParameters = function (args) {
    let { condition, title, author, content, isMatched } = args;
    const existedParameters = Object.entries({ title, content, author }).filter(
        (value) => value[1] != undefined
    );

    for (let parameter of existedParameters) {
        switch (parameter[0]) {
            case 'title':
                condition =
                    isMatched === true
                        ? condition.where('title').eq(title)
                        : condition.where('title').contains(title);
                break;
            case 'author':
                condition =
                    isMatched === true
                        ? condition.where('author').eq(author)
                        : condition.where('author').contains(author);
                break;
            case 'content':
                condition =
                    isMatched === true
                        ? condition.where('content').eq(content)
                        : condition.where('content').contains(content);
                break;
        }
    }
    return condition;
};

export default { sortingType, lastKeyType, validParameters };
export { sortingType, lastKeyType, validParameters };
