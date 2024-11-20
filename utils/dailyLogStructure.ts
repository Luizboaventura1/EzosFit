export const dailyLogStructure = {
  date: null as Date | null,
  meals: [],
  dailyConsumption: {
    calories: null as number | null,
    macros: {
      protein: null as number | null,
      carbohydrates: null as number | null,
      fats: null as number | null,
    },
  },
};
