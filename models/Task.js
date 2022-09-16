const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idValidator = require("mongoose-id-validator");

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },

    status: {
        type: String,
        enum: ["new", "in_progress", "complete"],
        require: true,
    }
});

TaskSchema.plugin(idValidator,{message : 'Bad ID value for {PATH}'});
const User = mongoose.model("User", TaskSchema);
module.exports = User;