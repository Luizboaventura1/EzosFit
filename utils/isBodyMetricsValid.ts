import type User from "~/types/UserType.ts";

type bodyMetrics = Pick<
  User["bodyMetrics"],
  "age" | "sex" | "height" | "weight"
>;

export default function isBodyMetricsValid(bodyMetrics: bodyMetrics | null) {
  if (!bodyMetrics) return false;

  const { age, sex, weight, height } = bodyMetrics;

  return !!(age && sex && weight && height);
}
