const router = require('express').Router();
const Workout = require('../models/workout');

router.get("/workouts", (req, res) => {
    Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.put('/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true, runValidators: true }
    )
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;