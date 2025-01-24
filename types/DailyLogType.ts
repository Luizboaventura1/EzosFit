export default interface DailyLog {
  date: Date | null;
  meals: [];
  dailyConsumption: {
    calories: number | null;
    water: number | null,
    macros: {
      protein: number | null;
      carbohydrates: number | null;
      fats: number | null;
    };
  };
}
