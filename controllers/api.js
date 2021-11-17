const router = require('express').Router();
const Workout = require('../models/workout');

router.get("/workouts", (req, res) => {
    // Workout.find({})
    // .sort({ date: -1 })
    // .then(dbWorkout => {
    //   res.json(dbWorkout);
    // })
    // .catch(err => {
    //   res.status(400).json(err);
    // });
    Workout.aggregate(
      [
        {
          // $addfields - need total duration
          $addFields: {
            totalDuration: {
              $sum: '$exercises.duration'
            }
          }
        },
      ]
    )
    .then(dbWorkout => {
      console.log(dbWorkout);
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

router.get('/workouts/range', (req, res) => {
  Workout.aggregate(
    [
      {
        // $addfields - need total duration
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration'
          }
        }
      },
      {
        $sort: {
          day: -1
        }
      },
      {
        $limit: 7
      }
    ]
  )
  // .sort it limit it and send data back as json
  .then((dbWorkouts) => {
    res.json(dbWorkouts)
  })
  .catch((err) => {
    res.status(400).json(err);
})});


module.exports = router;