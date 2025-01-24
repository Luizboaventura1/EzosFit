<template>
  <div class="w-full max-w-xl">
    <div class="relative">
      <input
        class="search-food-secondary opacity-0 bg-transparent placeholder-neutral-500 focus:outline-none py-2 text-light-gray font-light w-full"
      />
      <div
        v-if="!showMainInput"
        class="absolute top-0 left-0 flex items-center gap-3 border border-charcoal-gray bg-dark-charcoal rounded-3xl px-4 w-full"
      >
        <MagnifyingGlassIcon size="16" />
        <input
          @click="handleClickSecondaryInput"
          :placeholder="props.placeholder || ''"
          :type="props.inputType || 'text'"
          v-model="searchQuery"
          class="search-food-secondary bg-transparent placeholder-neutral-500 focus:outline-none py-2 text-light-gray font-light w-full"
        />
      </div>

      <div
        v-if="showMainInput"
        @click.stop
        class="search-food-main overflow-hidden space-y-2 absolute top-0 left-0 w-full h-auto bg-dark-charcoal rounded-3xl border border-charcoal"
      >
        <div class="flex items-center gap-3 rounded-3xl px-4 w-full">
          <MagnifyingGlassIcon size="16" />
          <input
            @input="searchFood()"
            v-model="searchQuery"
            ref="mainInput"
            :placeholder="props.placeholder || ''"
            :type="props.inputType || 'text'"
            class="bg-transparent placeholder-neutral-500 focus:outline-none py-2 text-light-gray font-light w-full"
          />
        </div>
        <ul v-if="foods.length" class="max-h-[260px] overflow-y-auto">
          <li
            v-for="(food, index) in foods"
            :key="index"
            @click="addFood(food)"
            class="py-2 px-4 font-light cursor-pointer text-light-gray hover:bg-charcoal transition-colors duration-150"
          >
            <div class="flex gap-3 items-center justify-between">
              <div class="font-medium">{{ food.name }}</div>
              <div
                class="grid gap-2 grid-cols-3 lg:grid-cols-5 text-light-gray text-center text-sm"
              >
                <div>
                  <div class="font-semibold">{{ food.protein }}</div>
                  <div class="text-yellow-500">Proteins</div>
                </div>
                <div>
                  <div class="font-semibold">{{ food.fat }}</div>
                  <div class="text-orange-500">Fats</div>
                </div>
                <div>
                  <div class="font-semibold">{{ food.fiber }}</div>
                  <div class="text-purple-500">Fiber</div>
                </div>
                <div>
                  <div class="font-semibold">{{ food.carbs }}</div>
                  <div class="text-lime-500">Carbs</div>
                </div>
                <div>
                  <div class="font-semibold">{{ food.calories }}</div>
                  <div class="text-blue-500">Calories</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else-if="noSearchResults">
          <h1 class="text-neutral-400 text-center px-4 py-3">No results :(</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import MagnifyingGlassIcon from "~/components/icons/MagnifyingGlassIcon.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import type Food from "~/types/FoodType";

const props = defineProps<{
  placeholder?: string;
  inputType?: string;
}>();

const searchQuery = ref("");
const foods = ref<Food[]>([]);
const showMainInput = ref(false);
const mainInput = ref();
const noSearchResults = ref(false);

const emit = defineEmits(["addFood"]);

const searchFood = async () => {
  const db = getFirestore();
  searchQuery.value = searchQuery.value.trim().toLowerCase();

  if (searchQuery.value.length < 1) {
    foods.value = [];
    noSearchResults.value = false;
    return;
  }

  const foodsRef = collection(db, "foods");

  const q = query(
    foodsRef,
    where("search_keywords", "array-contains", searchQuery.value),
    orderBy("name"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  foods.value = querySnapshot.docs.map((doc) => {
    const { search_keywords, ...food } = doc.data();

    return { ...food };
  }) as Food[];
};

const addFood = (food: Food) => {
  const preDefinedQuantity = 100;
  food.quantity = preDefinedQuantity;

  emit("addFood", food);

  searchQuery.value = "";
  showMainInput.value = false; // close input results
};

const handleClickSecondaryInput = () => {
  showMainInput.value = true;
  nextTick(() => {
    mainInput.value?.focus();
  });
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    !target.closest(".search-food-secondary") &&
    !target.closest(".search-food-main")
  ) {
    showMainInput.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(foods, () => {
  setTimeout(() => {
    if (!foods.value.length && searchQuery.value.trim().length) {
      noSearchResults.value = true;
    }
  }, 2000);

  if (foods.value.length) {
    noSearchResults.value = false;
  }
});

watch(searchQuery, () => {
  if (searchQuery.value.trim().length < 1) {
    mainInput.value = false; // close search bar
  }
});
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
