<template>
  <div @click="toggleModal" class="relative">
    <div
      :style="`width: ${props.size}px;height: ${props.size}px;`"
      class="rounded-full overflow-hidden cursor-pointer"
    >
      <img
        v-if="userPhoto"
        @click.stop="toggleModal"
        class="w-full"
        :src="userPhoto"
        alt="User"
      />
      <svg
        v-else
        class="fill-charcoal-gray"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <circle
            cx="256"
            cy="128"
            r="128"
            opacity="1"
            data-original="#000000"
          ></circle>
          <path
            d="M256 298.667c-105.99.118-191.882 86.01-192 192C64 502.449 73.551 512 85.333 512h341.333c11.782 0 21.333-9.551 21.333-21.333-.117-105.99-86.009-191.883-191.999-192z"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>
    </div>
    <Transition>
      <div
        v-if="stateModal"
        class="absolute options-modal-container -bottom-32 right-0 space-y-4 bg-dark-charcoal rounded-2xl px-2 py-4 border border-charcoal w-60"
      >
        <header class="flex gap-2 items-center px-3">
          <svg
            class="w-4 h-4 fill-light-gray"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="512"
            height="512"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                d="M244.317 299.051c-90.917 8.218-160.183 85.041-158.976 176.32V480c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32v-5.909c-.962-56.045 40.398-103.838 96-110.933 58.693-5.82 110.992 37.042 116.812 95.735.344 3.47.518 6.954.521 10.441V480c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32v-10.667c-.104-94.363-76.685-170.774-171.047-170.67a171.4 171.4 0 0 0-11.31.388zM256.008 256c70.692 0 128-57.308 128-128S326.7 0 256.008 0s-128 57.308-128 128c.07 70.663 57.337 127.929 128 128zm0-192c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64z"
                opacity="1"
                data-original="#000000"
              ></path>
            </g>
          </svg>
          <PrimaryText sm> Account </PrimaryText>
        </header>
        <main>
          <button
            @click="logout"
            class="flex gap-2 items-center font-medium text-red-500 text-sm hover:bg-red-500/10 rounded-full px-3 py-2 transition-colors duration-200 w-full text-start"
          >
            <svg
              class="w-4 h-4 fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M170.698 448H72.757a8.746 8.746 0 0 1-8.725-8.725V72.725A8.746 8.746 0 0 1 72.757 64h97.941c17.673 0 32-14.327 32-32s-14.327-32-32-32H72.757C32.611.047.079 32.58.032 72.725v366.549C.079 479.42 32.611 511.953 72.757 512h97.941c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="m483.914 188.117-82.816-82.752c-12.501-12.495-32.764-12.49-45.259.011s-12.49 32.764.011 45.259l72.789 72.768-289.941.597c-17.673 0-32 14.327-32 32s14.327 32 32 32l291.115-.533-73.963 73.963c-12.042 12.936-11.317 33.184 1.618 45.226 12.295 11.445 31.346 11.436 43.63-.021l82.752-82.752c37.491-37.49 37.491-98.274.001-135.764l-.001-.001.064-.001z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            Log out
          </button>
        </main>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import PrimaryText from "../text/PrimaryText.vue";

const props = defineProps<{ size: string }>();
const router = useRouter();
const userPhoto = ref<string | null>(null);
const stateModal = ref(false);

const toggleModal = () => {
  stateModal.value = !stateModal.value;
};

const logout = async () => {
  const auth = getAuth();

  await signOut(auth).then(() => {
    const logged = useCookie<boolean>("token");
    logged.value = false;

    router.push("/");
  });
};

const handleClickOutside = (event: Event) => {
  const modalElement = document.querySelector(".options-modal-container");

  if (
    modalElement &&
    event.target instanceof HTMLElement &&
    !modalElement.contains(event.target)
  ) {
    stateModal.value = false;
  }
};

onBeforeUnmount(() => {
  document.body.removeEventListener("click", handleClickOutside);
});

onMounted(() => {
  document.body.addEventListener("click", handleClickOutside);
});

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user && user.photoURL) {
      userPhoto.value = user.photoURL;
    }
  });
});
</script>

<style lang="scss" scoped>
.avatar {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>