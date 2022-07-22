"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultExercises = exports.checkBodyPart = void 0;
// List of default programs
var defaultExercises = [{
  exercise: "ARM CURL",
  bodyPart: "Arm"
}, {
  exercise: "TRICEP EXTENSION",
  bodyPart: "Arm"
}, {
  exercise: "BARBELL ROW",
  bodyPart: "Back"
}, {
  exercise: "BENT-OVER ROW",
  bodyPart: "Back"
}, {
  exercise: "LAT PULL-DOWN",
  bodyPart: "Back"
}, {
  exercise: "ONE ARM ROW",
  bodyPart: "Back"
}, {
  exercise: "PULL-UP (OVERHAND GRIP)",
  bodyPart: "Back"
}, {
  exercise: "PULL-UP (PARALLEL GRIP)",
  bodyPart: "Back"
}, {
  exercise: "SEATED ROW",
  bodyPart: "Back"
}, {
  exercise: "BENCH PRESS (FLAT)",
  bodyPart: "Chest"
}, {
  exercise: "BENCH PRESS (INCLINED)",
  bodyPart: "Chest"
}, {
  exercise: "DIP",
  bodyPart: "Chest"
}, {
  exercise: "PUSH-UP",
  bodyPart: "Chest"
}, {
  exercise: "CRUNCH",
  bodyPart: "Core"
}, {
  exercise: "DEADLIFT (ROMANIAN)",
  bodyPart: "Core"
}, {
  exercise: "DEADLIFT (CONVENTIONAL)",
  bodyPart: "Core"
}, {
  exercise: "SIT-UP",
  bodyPart: "Core"
}, {
  exercise: "CALF RAISE",
  bodyPart: "Leg"
}, {
  exercise: "LEG CURL",
  bodyPart: "Leg"
}, {
  exercise: "LEG EXTENSION",
  bodyPart: "Leg"
}, {
  exercise: "SQUAT",
  bodyPart: "Leg"
}, {
  exercise: "FRONT LATERAL RAISE",
  bodyPart: "Shoulder"
}, {
  exercise: "OVERHEAD PRESS",
  bodyPart: "Shoulder"
}, {
  exercise: "SIDE LATERAL RAISE",
  bodyPart: "Shoulder"
}]; // Check if bodyPart is one of the predefined options

exports.defaultExercises = defaultExercises;

var checkBodyPart = function checkBodyPart(bodyPart) {
  var bodyParts = ["Arm", "Back", "Chest", "Core", "Leg", "Shoulder"];
  return bodyParts.includes(bodyPart);
};

exports.checkBodyPart = checkBodyPart;