import { foodStructure } from "./foodStructure";

export const mealStructure = {
  mealName: null as string | null,
  date: null as Date | null,
  completed: false as boolean,
  foods: [] as (typeof foodStructure)[],
};
