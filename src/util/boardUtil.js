const sortingType = function ({ sort, Query }) {
    let query = Query;
    let [sortType, indexType] = [];
    if (sort) {
        [sortType, indexType] = sort.split('/');
        query = query.sort(sortType).using(`${indexType}-index`);
    }
    return query;
};

const validParameters = function (args) {
    let { condition, title, author, content, isMatched } = args;
    const existedParameters = Object.entries({ title, content, author }).filter(
        (value) => value[1] != undefined
    );

    for (let [key, value] of existedParameters) {
        condition =
            isMatched === true
                ? condition.where(key).eq(value)
                : condition.where(key).contains(value);
    }
    return condition;
};

const lastKeyType = function ({ sort, lastKey, lastKeyValue }) {
    const [_, indexType] = sort.split('/');
    lastKey[indexType] = lastKeyValue;
    return lastKey;
};

export default { sortingType, lastKeyType, validParameters };
export { sortingType, lastKeyType, validParameters };
