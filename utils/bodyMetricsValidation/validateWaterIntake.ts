export default function validateWaterIntake(
  waterIntake: number | null
): boolean | string {
  return waterIntake && waterIntake >= 0 ? true : false;
}
