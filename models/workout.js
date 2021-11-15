const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            category: String,
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ]
})