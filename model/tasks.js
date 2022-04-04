const mongoose = require('mongoose');
const schema = mongoose.Schema;
const tasksSchema = new schema
    ({
        Description: String,
        Completed: Boolean
    });
const tasks = mongoose.model('tasks', tasksSchema);
module.exports = tasks;