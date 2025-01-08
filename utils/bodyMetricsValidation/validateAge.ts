export default function validateAge (age: number | null) {
  return age && age >= 0 && age < 120;
};