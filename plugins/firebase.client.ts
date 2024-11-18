import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

    const firebaseConfig = {
      apiKey: config.apiKey as string,
      authDomain: config.authDomain as string,
      projectId: config.projectId as string,
      storageBucket: config.storageBucket as string,
      messagingSenderId: config.messagingSenderId as string,
      appId: config.appId as string,
      measurementId: config.measurementId as string,
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const firestore = getFirestore(app);

    nuxtApp.vueApp.provide("auth", auth);
    nuxtApp.provide("auth", auth);

    nuxtApp.vueApp.provide("firestore", firestore);
    nuxtApp.provide("firestore", firestore);

});
