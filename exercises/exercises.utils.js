// Default list of exercises
export const defaultExercises = [
  { exercise: "BENCH PRESS", bodyPart: "Chest" },
  { exercise: "DIP", bodyPart: "Chest" },
  { exercise: "PULL-UP (OVERHAND GRIP)", bodyPart: "Chest" },
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
