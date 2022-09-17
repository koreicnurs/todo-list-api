const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idValidator = require("mongoose-id-validator");

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["new", "in_progress", "complete"],
        required: true,
    }
});

TaskSchema.plugin(idValidator,{message : 'Bad ID value for {PATH}'});
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;