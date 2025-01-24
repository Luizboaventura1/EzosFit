export default function validateHeight(height: number | null) {
  return height && height > 50 && height < 300;
}
