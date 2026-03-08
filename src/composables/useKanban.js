import { ref, watch, onMounted } from "vue";

export function useKanban() {
  let columns = ref([
    {
      title: "To Do",
      id: 1,
    },
    {
      title: "In Progress",
      id: 2,
    },
    {
      title: "Done",
      id: 3,
    },
  ]);

  let tasks = ref([
    {
      text: "Task 1",
      col_id: 1,
      order: 1,
      id: 1223213,
    },
    {
      text: "Task 2",
      col_id: 2,
      order: 1,
      id: 1324324,
    },
    {
      text: "Task 3",
      col_id: 1,
      order: 3,
      id: 1543543,
    },
  ]);

  watch(
    tasks,
    () => {
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
    },
    { deep: true },
  );

  function addTask(col_id) {
    const tasksInColumn = tasks.value.filter((t) => t.col_id === col_id);
    tasks.value.push({
      text: `Task ${tasks.value.length + 1}`,
      col_id: col_id,
      order: tasksInColumn.length,
      id: Date.now(),
    });
  }

  function deleteTask(taskId) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    const tasksInColumn = tasks.value.filter(
      (t) => t.col_id === tasks.value.find((t) => t.id === taskId)?.col_id,
    );
    tasksInColumn.forEach((task, index) => {
      task.order = index;
    });
  }

  function renameTask(taskId, newText) {
    let task = tasks.value.find((task) => task.id === taskId);
    if (task) {
      task.text = newText;
    }
  }

  let isDragging = ref(false);

  function setIsDragging(mode) {
    if (mode) {
      isDragging.value = true;
    }
    if (!mode) {
      isDragging.value = false;
    }
  }

  function moveTask({ taskId, toColumnId, newIndex }) {
    const task = tasks.value.find((t) => t.id === taskId);

    task.col_id = toColumnId;

    const colTasks = tasks.value
      .filter((t) => t.col_id === toColumnId && t.id !== taskId)
      .sort((a, b) => a.order - b.order);

    colTasks.splice(newIndex, 0, task);

    colTasks.forEach((t, i) => (t.order = i));
  }

  onMounted(() => {
    const savedTasks = localStorage.getItem("tasks");
    tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
  });

  return {
    columns,
    tasks,
    addTask,
    deleteTask,
    renameTask,
    moveTask,
    isDragging,
    setIsDragging,
  };
}
