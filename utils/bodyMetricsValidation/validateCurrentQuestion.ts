import type User from "~/types/UserType";
import validateActivityLevel from "./validateActivityLevel";
import validateObjective from "./validateObjective";
import validateHeight from "./validateHeight";
import validateSex from "./validateSex";
import validateAge from "./validateAge";
import validateWeight from "./validateWeight";

type BodyMetrics = User["bodyMetrics"];

export default function validateCurrentQuestion(
  stepper: number,
  bodyMetrics: BodyMetrics
) {
  switch (stepper) {
    case 1:
      return validateObjective(bodyMetrics.objective);
    case 2:
      return validateActivityLevel(bodyMetrics.activityLevel);
    case 3:
      return validateHeight(bodyMetrics.height);
    case 4:
      return validateSex(bodyMetrics.sex);
    case 5:
      return validateAge(bodyMetrics.age);
    case 6:
      return validateWeight(bodyMetrics.weight);
    default:
      return false;
  }
}
