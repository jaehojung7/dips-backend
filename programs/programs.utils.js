// Parse program description and create hashtag objects
export const processHashtags = (description) => {
  const hashtags = description.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};

// List of default programs
export const defaultPrograms = [
  {
    title: "StrongLifts 5x5",
    isPublic: true,
    workouts: {
      create: [
        {
          title: "Workout A",
          workoutIndex: 0,
          workoutSets: {
            create: [
              {
                workoutIndex: 0,
                workoutSetIndex: 0,
                exercise: "SQUAT",
                setCount: 5,
                repCount: 5,
              },
              {
                workoutIndex: 0,
                workoutSetIndex: 1,
                exercise: "BENCH PRESS (FLAT)",
                setCount: 5,
                repCount: 5,
              },
              {
                workoutIndex: 0,
                workoutSetIndex: 2,
                exercise: "BARBELL ROW",
                setCount: 5,
                repCount: 5,
              },
            ],
          },
        },
        {
          title: "Workout B",
          workoutIndex: 1,
          workoutSets: {
            create: [
              {
                workoutIndex: 1,
                workoutSetIndex: 0,
                exercise: "SQUAT",
                setCount: 5,
                repCount: 5,
              },
              {
                workoutIndex: 1,
                workoutSetIndex: 1,
                exercise: "OVERHEAD PRESS",
                setCount: 5,
                repCount: 5,
              },
              {
                workoutIndex: 1,
                workoutSetIndex: 2,
                exercise: "DEADLIFT (CONVENTIONAL)",
                setCount: 1,
                repCount: 5,
              },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Dips' Push-Pull-Legs",
    isPublic: true,
    workouts: {
      create: [
        {
          title: "Workout 1-Push",
          workoutIndex: 0,
          workoutSets: {
            create: [
              {
                workoutIndex: 0,
                workoutSetIndex: 0,
                exercise: "BENCH PRESS (FLAT)",
                setCount: 4,
                repCount: 8,
              },
              {
                workoutIndex: 0,
                workoutSetIndex: 1,
                exercise: "OVERHEAD PRESS",
                setCount: 4,
                repCount: 8,
              },
              {
                workoutIndex: 0,
                workoutSetIndex: 2,
                exercise: "BENCH PRESS (INCLINED)",
                setCount: 3,
                repCount: 10,
              },
              {
                workoutIndex: 0,
                workoutSetIndex: 3,
                exercise: "DIP",
                setCount: 3,
                repCount: 10,
              },
              {
                workoutIndex: 0,
                workoutSetIndex: 4,
                exercise: "TRICEP EXTENSION",
                setCount: 3,
                repCount: 10,
              },
            ],
          },
        },

        {
          title: "Workout 2-Pull",
          workoutIndex: 1,
          workoutSets: {
            create: [
              {
                workoutIndex: 1,
                workoutSetIndex: 0,
                exercise: "PULL-UP (OVERHAND GRIP)",
                setCount: 4,
                repCount: 8,
              },
              {
                workoutIndex: 1,
                workoutSetIndex: 1,
                exercise: "BARBELL ROW",
                setCount: 4,
                repCount: 8,
              },
              {
                workoutIndex: 1,
                workoutSetIndex: 2,
                exercise: "LAT PULL-DOWN",
                setCount: 3,
                repCount: 10,
              },
              {
                workoutIndex: 1,
                workoutSetIndex: 3,
                exercise: "SEATED ROW",
                setCount: 3,
                repCount: 10,
              },
              {
                workoutIndex: 1,
                workoutSetIndex: 4,
                exercise: "ARM CURL",
                setCount: 3,
                repCount: 10,
              },
            ],
          },
        },

        {
          title: "Workout 3-Legs",
          workoutIndex: 2,
          workoutSets: {
            create: [
              {
                workoutIndex: 2,
                workoutSetIndex: 0,
                exercise: "SQUAT",
                setCount: 4,
                repCount: 8,
              },
              {
                workoutIndex: 2,
                workoutSetIndex: 1,
                exercise: "DEADLIFT (CONVENTIONAL)",
                setCount: 4,
                repCount: 8,
              },
              {
                workoutIndex: 2,
                workoutSetIndex: 2,
                exercise: "LEG EXTENSION",
                setCount: 3,
                repCount: 10,
              },
              {
                workoutIndex: 2,
                workoutSetIndex: 3,
                exercise: "LEG CURL",
                setCount: 3,
                repCount: 10,
              },
              {
                workoutIndex: 2,
                workoutSetIndex: 4,
                exercise: "CALF RAISE",
                setCount: 3,
                repCount: 10,
              },
            ],
          },
        },
      ],
    },
  },
];
