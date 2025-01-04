export default function validateWeight (weight: number | null) {
  return weight && weight > 2 && weight < 500;
};