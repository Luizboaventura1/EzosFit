export default interface WeeklyPerformance {
  date: Date | null;
  caloriesConsumed: number | null;
  caloricTarget: number | null;
  macrosConsumed: {
    protein: number | null;
    carbohydrates: number | null;
    fats: number | null;
  };
  macroTargets: {
    protein: number | null;
    carbohydrates: number | null;
    fats: number | null;
  };
  onTarget: boolean;
}
