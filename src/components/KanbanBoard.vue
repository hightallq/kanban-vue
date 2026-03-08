<script setup>
import KanbanColumn from './KanbanColumn.vue';
import { useKanban } from '../composables/useKanban';
import { useLocalStorage } from '../composables/localStorage';

const { columns, tasks, addTask, deleteTask, renameTask, moveTask, isDragging, setIsDragging } = useKanban();
useLocalStorage(tasks);

</script>

<template>
  <div class="kan_board"> 
    <div class="kan_col_div">
      <KanbanColumn v-for="column in columns" :column="column" :tasks="tasks" :isDragging="isDragging" @isDragging="setIsDragging" @add-task="addTask"
        @delete-task="deleteTask" @rename-task="renameTask" @move-task="moveTask" />
    </div>
  </div>
</template>

<style scoped>
.kan_board {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: auto;
}

.kan_col_div {
  display: flex;
  width: max-content;
  gap: 20px;
}

@media (max-width: 768px) {
  .kan_board {
    justify-content: flex-start;
  }

}
</style>
