<template>
  <div
    v-if="props.stateModal"
    @click="$emit('closeModal')"
    class="fixed top-0 left-0 z-50 h-screen w-full flex justify-center items-center px-5 bg-black/30"
  >
    <div
      @click.stop
      class="bg-dark-charcoal rounded-2xl p-5 border border-charcoal w-full sm:max-w-md lg:max-w-xl space-y-6"
    >
      <header>
        <PrimaryText xl> {{ props.modalTitle }} </PrimaryText>
      </header>
      <div
        class="grid gap-2 grid-cols-3 md:grid-cols-5 text-light-gray text-center text-sm"
      >
        <div>
          <div class="font-semibold">{{ totalMacronutrients.protein }}g</div>
          <div class="text-yellow-500">Proteins</div>
        </div>
        <div>
          <div class="font-semibold">{{ totalMacronutrients.fat }}g</div>
          <div class="text-orange-500">Fat</div>
        </div>
        <div>
          <div class="font-semibold">{{ totalMacronutrients.fiber }}g</div>
          <div class="text-purple-500">Fiber</div>
        </div>
        <div>
          <div class="font-semibold">{{ totalMacronutrients.carbs }}g</div>
          <div class="text-lime-500">Carbs</div>
        </div>
        <div>
          <div class="font-semibold">{{ totalMacronutrients.calories }}cal</div>
          <div class="text-blue-500">Calories</div>
        </div>
      </div>
      <main class="space-y-4">
        <TextInputForm
          @modelValue="(meal) => (mealName = meal)"
          :default-value="mealName"
          placeholder="Meal name"
          type="text"
        />
        <TextInputForm
          @modelValue="(time) => (mealTime = time)"
          :default-value="mealTime"
          class="appearance-none"
          type="datetime-local"
        />
      </main>

      <h1
        v-if="noDateErrorMessage.length"
        class="text-red-500 bg-red-500/20 rounded-full p-2 px-4"
      >
        {{ noDateErrorMessage }}
      </h1>

      <div>
        <SearchFood
          @add-food="(food) => addFood(food)"
          placeholder="Search food"
        />
      </div>

      <h1
        v-if="noFoodErrorMessage.length"
        class="text-red-500 bg-red-500/20 rounded-full p-2 px-4"
      >
        {{ noFoodErrorMessage }}
      </h1>

      <section v-if="foods.length" class="overflow-x-auto">
        <div class="max-h-72 overflow-y-auto">
          <table class="w-full text-sm text-light-gray">
            <thead>
              <tr class="text-medium-gray">
                <th class="px-2 text-left">Food</th>
                <th class="px-2 text-center">Proteins</th>
                <th class="px-2 text-center">Fat</th>
                <th class="px-2 text-center">Fiber</th>
                <th class="px-2 text-center">Carbs</th>
                <th class="px-2 text-center">Calories</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(food, index) in foods"
                :key="index"
                class="py-2 border-b border-charcoal-gray"
              >
                <td class="p-2 text-left">{{ food.name }}</td>
                <td class="p-2 text-center">
                  {{ multiplyMacronutrients(food.protein, food.quantity) }}g
                </td>
                <td class="p-2 text-center">
                  {{ multiplyMacronutrients(food.fat, food.quantity) }}g
                </td>
                <td class="p-2 text-center">
                  {{ multiplyMacronutrients(food.fiber, food.quantity) }}g
                </td>
                <td class="p-2 text-center">
                  {{ multiplyMacronutrients(food.carbs, food.quantity) }}g
                </td>
                <td class="p-2 text-center">
                  {{ multiplyMacronutrients(food.calories, food.quantity) }}cal
                </td>
                <td class="flex items-center p-2">
                  <input
                    v-model="food.quantity"
                    type="number"
                    class="w-20 bg-transparent outline-none text-center transition-colors duration-200 hover:bg-charcoal rounded-full py-2"
                  />g
                </td>
                <td>
                  <button
                    @click="removeFood(index)"
                    class="rounded-full hover:bg-red-500/20 p-3 transition-colors duration-200"
                  >
                    <BinIcon size="16" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer class="flex items-center justify-between gap-3">
        <div class="flex gap-3">
          <SecondaryButton @click="editMeal"> Save </SecondaryButton>
          <SecondaryButton @click="emit('closeModal')"> Close </SecondaryButton>
        </div>
        <div>
          <button
            @click="removeMeal(props.foodIndex)"
            class="flex gap-3 items-center rounded-full hover:bg-red-500/20 py-2 px-3 transition-colors duration-200"
          >
            <BinIcon size="16" />
            <span class="text-red-500">Del meal</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import SecondaryButton from "~/components/global/buttons/SecondaryButton.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import SearchFood from "@/components/dashboard/SearchFood/index.vue";
import TextInputForm from "~/components/global/form/TemplateInput.vue";
import type Food from "~/types/FoodType";
import BinIcon from "~/components/icons/BinIcon.vue";
import { storeToRefs } from "pinia";

const props = defineProps<{
  modalTitle: string;
  stateModal: boolean;
  foodIndex: number | null;
}>();

const emit = defineEmits(["closeModal"]);

const { user } = storeToRefs(userStore());
const foods = ref<Food[]>([]);
const mealName = ref("");
const mealTime = ref<Date | null>(null);
const noFoodErrorMessage = ref("");
const noDateErrorMessage = ref("");

const totalMacronutrients = computed(() => {
  return foods.value.reduce(
    (totals, food) => {
      totals.calories += Math.round(
        multiplyMacronutrients(food.calories, food.quantity)
      );
      totals.protein += Math.round(
        multiplyMacronutrients(food.protein, food.quantity)
      );
      totals.carbs += Math.round(
        multiplyMacronutrients(food.carbs, food.quantity)
      );
      totals.fat += Math.round(multiplyMacronutrients(food.fat, food.quantity));
      totals.fiber += Math.round(
        multiplyMacronutrients(food.fiber, food.quantity)
      );
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
});

const addFood = (food: Food) => {
  const foodAlreadyExists = foods.value.some(
    (existingFood: Food) => food.name === existingFood.name
  );

  if (!foodAlreadyExists) {
    foods.value.unshift(food);
  }
};

const removeFood = (index: number) => foods.value.splice(index, 1);

const editMeal = () => {
  if (user.value && foods.value.length && user.value.meals && props.foodIndex !== null) {
    mealName.value = mealName.value || "Meal";

    Object.assign(user.value.meals[props.foodIndex], {
      mealName: mealName.value,
      foods: [...foods.value],
    });

    userStore().updateUserData(user.value);
    emit("closeModal");
  } else if (user.value && !foods.value.length && user.value.meals) {
    noFoodErrorMessage.value = "Minimum of one food";
  }
};

const removeMeal = (index: number | null) => {
  if (user.value && user.value.meals && index !== null) {
    user.value.meals.splice(index, 1);
    userStore().updateUserData(user.value);
    emit("closeModal");
  }
};

const multiplyMacronutrients = (
  macroQuantity: number,
  quantity: number
): number => {
  const minimumQuantity = 1;
  const maximumDecimalPlaces = 0;

  return parseFloat(
    (macroQuantity * (quantity || minimumQuantity)).toFixed(
      maximumDecimalPlaces
    )
  );
};

const loadMealData = () => {
  if (
    user.value &&
    user.value?.meals &&
    props.foodIndex !== null &&
    user.value.meals[props.foodIndex]?.foods
  ) {
    mealName.value =
      user.value.meals[props.foodIndex].mealName || `Meal ${props.foodIndex}`;
    foods.value = [...(user.value.meals[props.foodIndex].foods as Food[])];
    mealTime.value = user.value.meals[props.foodIndex].date;
  }
};

onMounted(() => loadMealData());

watch(
  () => props.stateModal,
  () => {
    if (props.stateModal) {
      loadMealData();
    }
  }
);

watch(mealTime, () => {
  if (mealTime.value) noDateErrorMessage.value = ""; // close error message
});

watch(foods.value, () => {
  if (foods.value.length) noFoodErrorMessage.value = ""; // close error message
});
</script>

<style scoped lang="scss">
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

section {
  div::-webkit-scrollbar {
    width: 6px;
  }

  div::-webkit-scrollbar-thumb {
    background-color: rgb(54, 54, 54);
    border-radius: 20px;

    &:hover {
      background-color: rgb(69, 69, 69);
    }
  }
}
</style>
