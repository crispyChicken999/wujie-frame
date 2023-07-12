//示例
import { ref, watchEffect } from "vue";

export function useMock() {
  const storage = localStorage.getItem("mock");
  const isMockEnable = ref<boolean>(
    storage ? storage === "true" : false ?? false
  );

  watchEffect(() => {
    localStorage.setItem("mock", String(isMockEnable.value));
  });

  return {
    isMockEnable
  };
}
