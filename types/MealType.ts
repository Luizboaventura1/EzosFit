import type Food from "./FoodType";

export default interface Meal {
  mealName: string | null;
  date: Date | null;
  completed: boolean;
  foods: Food[] | null;
}
