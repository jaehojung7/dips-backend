// Default list of exercises
export const defaultExercises = [
  { exercise: "Bench press", bodyPart: "Chest" },
  { exercise: "Dip", bodyPart: "Chest" },
  { exercise: "Pull-up (overhand grip)", bodyPart: "Chest" },
];

// Create exercise objects for default exercises
export const processExercises = (exerciseArray) => {
  return exerciseArray.map((exerciseObj) => ({
    where: {
      exercise: exerciseObj["exercise"],
    },
    create: {
      exercise: exerciseObj["exercise"],
      bodyPart: exerciseObj["bodyPart"],
    },
  }));
};

// Check if bodyPart is one of the predefined options
export const checkBodyPart = (bodyPart) => {
  const bodyParts = ["Arm", "Back", "Chest", "Core", "Leg", "Shoulder"];
  return bodyParts.includes(bodyPart);
};
