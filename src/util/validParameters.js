const validParameters = function (args) {
    let { condition, title, author, content, isMatched } = args;
    const existedParameters = Object.entries({ title, content, author }).filter(
        (it) => it[1] != undefined
    );

    for (let i of existedParameters) {
        switch (i[0]) {
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

export default { validParameters };
export { validParameters };
