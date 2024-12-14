import type { Ref } from "vue";
import type { Notification } from "@/components/global/popups/Toast/types/Notification";

export interface ToastInterface {
  toastList: Ref<Notification[]>;
  add: (newToast: Notification) => void;
}