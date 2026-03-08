<script setup>
import KanbanTask from './KanbanTask.vue';
import { computed } from 'vue';
import draggable from 'vuedraggable';

let emit = defineEmits(['add-task', 'delete-task', 'rename-task', 'move-task', 'isDragging']);
let props = defineProps({
  column: Object,
  tasks: Array,
  isDragging: Boolean,
});

const columnTasks = computed(() =>
  props.tasks
    .filter(t => t.col_id === props.column.id)
    .slice()
    .sort((a, b) => a.order - b.order)
)

function addTask(columnId) {
  emit('add-task', columnId);
}

function deleteTask(taskId) {
  emit('delete-task', taskId);
}

function renameTask(taskId, newText) {
  emit('rename-task', taskId, newText);
}

function onDragChange(event) {
  const task = event.added?.element || event.moved?.element
  const index = event.added?.newIndex ?? event.moved?.newIndex

  if (!task || index == null) return

  emit('move-task', {
    taskId: task.id,
    toColumnId: props.column.id,
    newIndex: index
  })
}

function onDragStart() {
  emit('isDragging', true);
}

function onDragEnd() {
  emit('isDragging', false);
}

</script>

<template>
  <div class="kan_column" :class="'column-'+column.id">
    <h2>{{ column.title }}</h2>
    <div class="tasks_placeholder" :class="{ active: isDragging }">
      <h3 v-if="columnTasks.length === 0">No tasks yet...</h3>
    <draggable class="list-group" :list="columnTasks" handle=".drag-handle" group="tasks" item-key="id"
      @change="onDragChange" @start="onDragStart" @end="onDragEnd">
      <template #item="{ element: task }">
        <KanbanTask :key="task.id" :task="task" @delete-task="deleteTask" @rename-task="renameTask" />
      </template>
    </draggable>
    </div>
    <div class="add_button">
      <button @click="addTask(column.id)">Add Task</button>
    </div>
  </div>
</template>

<style scoped>
.kan_column {
  padding: 10px;
  border-radius: 5px;
  width: 400px;
  flex-shrink: 0;
  margin: 0 10px;
  text-align: center;
  opacity: 0.9;
}

.kan_column h2 {
  color: white;
}

.column-1 {
  background-color: #4e8abb;
}

.column-2 {
  background-color: #cbad4b;
}

.column-3 {
  background-color: #6caf6c;
}

.tasks_placeholder {
  overflow-y: auto;
  height: 400px;
  padding: 3px;
  margin-bottom: 20px;
  border: 3px solid transparent;
}

.tasks_placeholder.active {
  border-style: dashed;
  border-color: #000000;
  border: 3px solid #000000 dashed;
  animation: floatingBorder 1.2s infinite;
}

.list-group {
  height: 400px;
}

.add_button button {
  text-align: center;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #000000;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.5s background-color;
}

.add_button button:hover {
  background-color: #c8c8c8;
}

@media (max-width: 480px) {
  .kan_column {
    width: 320px;
  }
}

@keyframes floatingBorder {
  0% {
    border-style: dashed;
    border-color: #000000;
  }
  50% {
    border: solid 3px transparent;
  }
  100% {
    border-style: dashed;
    border-color: #000000;
  }
}

</style>
