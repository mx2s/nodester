module.exports = {
    transform(err) {
        let result = [];
        return {
            "message": err.message,
        };
    }
};
