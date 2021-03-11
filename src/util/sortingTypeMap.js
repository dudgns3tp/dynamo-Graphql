const sortingType = new Map()
    .set('recent', { createdAt: 'desc' })
    .set('like', { like: 'desc' })
    .set('seq', { seq: 'asc' });

export default { sortingType };
export { sortingType };
