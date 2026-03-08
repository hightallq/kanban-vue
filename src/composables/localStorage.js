import { watch, onMounted } from "vue";

export function useLocalStorage(tasks) {
  watch(
    tasks,
    () => {
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
    },
    { deep: true },
  );

  onMounted(() => {
    const savedTasks = localStorage.getItem("tasks");
    tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
  });
}
