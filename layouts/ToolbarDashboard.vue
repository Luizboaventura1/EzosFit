<template>
  <nav
    class="flex gap-2 justify-between items-center border-b border-charcoal-gray pb-4"
  >
    <div>
      <div>
        <PrimaryText md> {{ userName }} </PrimaryText>
        <h2 class="text-medium-gray text-sm">{{ currentDate() }}</h2>
      </div>
    </div>
    <div>
      <AccountModal size="35" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onAuthStateChanged, getAuth } from "firebase/auth";
import AccountModal from "@/components/global/modals/AccountModal.vue";
import currentDate from "@/composables/currentDate";
import PrimaryText from "@/components/global/text/PrimaryText.vue";

const userName = ref("");

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    if (user && user.displayName) {
      userName.value = getFirstName(user.displayName);
    }
  });
});
</script>

<style scoped></style>
