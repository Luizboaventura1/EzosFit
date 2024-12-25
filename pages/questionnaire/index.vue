<template>
  <div></div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";

const router = useRouter();
const { user } = storeToRefs(userStore());

onMounted(async () => {
  await loadUserData(router).then(() => {
    if (
      user.value &&
      user.value.bodyMetrics &&
      isBodyMetricsValid(user.value.bodyMetrics)
    ) {
      router.push("/questionnaire");
    }
  });
});
</script>
