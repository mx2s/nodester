module.exports = {
    async message(res, message, status = 200) {
        res.status(status);
        await res.json({
            "data": {
                "status": status,
                "message": message
            }
        });
        res.end();
    },
    async error(res, message, status = 200) {
        res.status(status);
        await res.json({
            "data": {
                "status": status,
                "message": message
            }
        });
        res.end();
    }
};