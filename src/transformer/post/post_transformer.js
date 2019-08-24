module.exports = {
    transform(item) {
        return {
            "uuid": item.uuid,
            "title": item.title,
            "content": item.content
        };
    }
};

module.exports.transformMany = function(items) {
    let data = [];
    items.forEach(function (item) {
        data.push(module.exports.transform(item))
    });
    return data;
};
