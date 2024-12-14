<template>
  <section
    class="grid gap-5 grid-cols-1 md:grid-cols-[300px_1fr] bg-almost-black h-screen p-5"
  >
    <aside class="bg-dark-charcoal rounded-2xl p-5 border border-charcoal">
      <header class="mb-16">
        <EzosFitLogo size="small" />
      </header>
      <div class="flex gap-5 justify-between items-center mb-5">
        <PrimaryText xl> Meals </PrimaryText>
        <PlusButton />
      </div>
      <section>
        <MealList />
      </section>
    </aside>

    <main class="pt-5">
      <nav
        class="flex gap-2 justify-between items-center border-b border-charcoal-gray pb-4"
      >
        <div>
          <div>
            <PrimaryText md> {{ userName }} </PrimaryText>
            <span class="text-medium-gray text-sm">{{ currentDate() }}</span>
          </div>
        </div>
        <div>
          <AccountModal size="30" />
        </div>
      </nav>
      <div></div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import PlusButton from "~/components/global/buttons/PlusButton.vue";
import MealList from "~/components/dashboard/MealComponent/MealList.vue";
import AccountModal from "~/components/global/modals/AccountModal.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import currentDate from "~/composables/currentDate";

const router = useRouter();
const userName = ref<string>();

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    let token = useCookie<boolean>("token");
    token.value = !!user;

    if (!token.value) {
      router.push("/auth/login");
    }

    if (user && user.displayName) {
      userName.value = getFirstName(user.displayName);
    }

    if (user && user.email) {
      await userStore().loadUserData(user.email);
    }
  });
});
</script>

<style scoped></style>
