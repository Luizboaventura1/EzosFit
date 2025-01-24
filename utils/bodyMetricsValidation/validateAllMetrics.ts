import type User from "~/types/UserType";
import validateActivityLevel from "./validateActivityLevel";
import validateObjective from "./validateObjective";
import validateHeight from "./validateHeight";
import validateSex from "./validateSex";
import validateAge from "./validateAge";
import validateWeight from "./validateWeight";

type BodyMetrics = User["bodyMetrics"];

export default function validateAllMetrics (bodyMetrics: BodyMetrics) {
  return (
    validateObjective(bodyMetrics.objective) &&
    validateActivityLevel(bodyMetrics.activityLevel) &&
    validateHeight(bodyMetrics.height) &&
    validateSex(bodyMetrics.sex) &&
    validateAge(bodyMetrics.age) &&
    validateWeight(bodyMetrics.weight)
  );
};