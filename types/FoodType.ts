export default interface Food {
  name: string | null,
  quantity: number | null,
  calories: number | null,
  macros: {
    protein: number | null,
    carbohydrates: number | null,
    fats: number | null,
  },
}