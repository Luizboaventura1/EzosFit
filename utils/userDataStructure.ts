export const userDataStructure = {
  uid: null as string | null,
  name: null as string | null,
  email: null as string | null,
  photoUrl: null as string | null,
  bodyMetrics: {
    sex: null as string | null,
    age: null as number | null,
    height: null as number | null,
    weight: null as number | null,
    bodyFat: null as number | null,
    objective: null as string | null,
    activityLevel: null as string | null,
  },
  nutrition: {
    caloricTarget: null as number | null,
    waterTarget: null as number | null,
    macroTargets: {
      protein: null as number | null,
      carbohydrates: null as number | null,
      fats: null as number | null,
    },
  },
  meals: [] 
};
