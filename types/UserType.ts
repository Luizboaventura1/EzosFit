import type DailyLog from "./DailyLogType";
import type Meal from "./MealType";
import type WeeklyPerformance from "./WeeklyPerformanceType";

export default interface User {
  uid: string | null,
  name: string | null,
  email: string | null,
  photoUrl: string | null,
  bodyMetrics: {
    sex: string | null,
    age: number | null,
    height: number | null,
    weight: number | null,
    bodyFat?: number | null,
    objective: string | null,
    activityLevel: string | null,
  },
  nutrition: {
    caloricTarget: number | null,
    macroTargets: {
      protein: number | null,
      carbohydrates: number | null,
      fats: number | null,
    },
  },
  dailyLog?: DailyLog,
  weeklyPerformance?: WeeklyPerformance,
  meals?: Meal[]
}