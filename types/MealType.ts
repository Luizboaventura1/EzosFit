import type Food from "./FoodType";

export default interface Meal {
  mealName: string | null;
  foods?: Food[];
}
