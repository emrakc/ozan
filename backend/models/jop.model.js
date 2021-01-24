const mongoose = require('mongoose');
const priorityEnum = require('./priority.enum')
const schema = mongoose.Schema;

const jopSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 70,
    },
    priority: {
        type: Number,
        required: true,
        enum: [0, 1, 2]
    }
})
jopSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.priorityName = priorityEnum[object.priority]
    return object;
});

const Jop = mongoose.model('Jop', jopSchema);
module.exports = Jop;
