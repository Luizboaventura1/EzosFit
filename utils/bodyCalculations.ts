type Sex = "male" | "female";
type Objective = "Lose Weight" | "Maintain Weight" | "Build Muscle";
type ActivityLevel = "Sedentary" | "Moderately Active" | "Very Active";

interface UserInfo {
  sex: Sex;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  objective: Objective;
  activityLevel: ActivityLevel;
  bodyFat?: number;
}

class BodyCalculations {
  private userInfo: UserInfo;

  constructor(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  // Method to validate inputs
  private validateInputs() {
    const { sex, age, height, weight, activityLevel } = this.userInfo;

    if (!["male", "female"].includes(sex)) {
      throw new Error(
        "Invalid gender. Accepted values are 'male' or 'female'."
      );
    }
    if (age <= 0) throw new Error("Age must be greater than 0.");
    if (height <= 0) throw new Error("Height must be greater than 0.");
    if (weight <= 0) throw new Error("Weight must be greater than 0.");
    if (
      !["Sedentary", "Moderately Active", "Very Active"].includes(activityLevel)
    ) {
      throw new Error("Invalid activity level.");
    }
  }

  // Basal Metabolic Rate (BMR) calculation using Mifflin-St Jeor formula
  private calculateBMR(): number {
    const {
      sex,
      height,
      weight,
      age,
      bodyFat: bodyFatPercentage,
    } = this.userInfo;

    // If body fat percentage is provided, use a lean mass-based calculation
    if (bodyFatPercentage) {
      const leanMass = weight * (1 - bodyFatPercentage / 100);
      return 370 + 21.6 * leanMass;
    }

    // Otherwise, use Mifflin-St Jeor formula
    if (sex === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  // Total Daily Energy Expenditure (TDEE) calculation
  private calculateTDEE(): number {
    const bmr = this.calculateBMR();
    const activityMultiplier = this.getActivityMultiplier();
    return bmr * activityMultiplier;
  }

  // Activity multiplier based on activity level
  private getActivityMultiplier(): number {
    const { activityLevel } = this.userInfo;
    const multipliers: Record<ActivityLevel, number> = {
      Sedentary: 1.2,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
    };
    return multipliers[activityLevel];
  }

  // Macronutrient calculations based on goal
  public calculateMacros(): {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  } {
    const tdee = this.calculateTDEE();
    const { objective, weight } = this.userInfo;

    let protein: number;
    let fats: number;
    let carbs: number;

    switch (objective) {
      case "Maintain Weight":
        protein = weight * 2; // 2g per kg of body weight
        fats = (tdee * 0.25) / 9; // 25% of TDEE calories from fats
        carbs = (tdee - protein * 4 - fats * 9) / 4;
        break;

      case "Lose Weight":
        protein = weight * 2.2; // Slightly higher protein intake
        fats = (tdee * 0.2) / 9; // 20% of TDEE calories from fats
        carbs = (tdee - protein * 4 - fats * 9) / 4;
        break;

      case "Build Muscle":
        protein = weight * 2.5; // Higher protein intake
        fats = (tdee * 0.3) / 9; // 30% of TDEE calories from fats
        carbs = (tdee - protein * 4 - fats * 9) / 4;
        break;

      default:
        throw new Error("Invalid goal.");
    }

    return {
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      calories: Math.round(tdee), // Total caloric intake
    };
  }

  // Water intake calculation (in liters)
  public calculateWaterIntake(): number {
    const { weight, activityLevel } = this.userInfo;

    // Base water intake in liters
    let waterIntake = weight * 0.035;

    // Adjust for activity level
    const activityAdjustment: Record<ActivityLevel, number> = {
      Sedentary: 0,
      "Moderately Active": 0.4,
      "Very Active": 0.6,
    };

    waterIntake += activityAdjustment[activityLevel];
    return Math.round(waterIntake * 1000) / 1000; // Round to 3 decimal places
  }

  // Método para calcular o IMC (Índice de Massa Corporal)
  private calculateBMI(): number {
    const { weight, height } = this.userInfo;
    return weight / (height / 100) ** 2; // Peso em kg e altura em cm, então altura é convertida para metros
  }

  // Método para determinar o estado de saúde baseado no IMC
  public getHealthStatus(): string {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Healthy";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  // Full summary method
  public getSummary(): Record<string, any> {
    this.validateInputs();

    return {
      BMR: Math.round(this.calculateBMR()),
      TDEE: Math.round(this.calculateTDEE()),
      macros: this.calculateMacros(),
      waterIntake: this.calculateWaterIntake(),
    };
  }
}

export default BodyCalculations;
