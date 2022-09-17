const rootPath = __dirname;

module.exports = {
    rootPath,
    mongo: {
        db: "mongodb://localhost/todoList",
        options: {useNewUrlParser: true},
    }
};