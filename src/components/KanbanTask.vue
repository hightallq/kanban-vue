<script setup>
import { ref, nextTick } from 'vue';

let emit = defineEmits(['add-task', 'delete-task', 'rename-task']);
let props = defineProps({
  task: Object,
});

function deleteTask(taskId) {
  emit('delete-task', taskId);
}

let editMode = ref(false);
let editedText = ref('');
let inputRef = ref(null);

async function startRenameTask() {
  if (editMode.value) return;
  editMode.value = true;
  editedText.value = props.task.text;
  await nextTick();
  inputRef.value.focus();
  return;
}

function finishRenameTask(taskId, newText) {
  if (newText.trim() === '') {
    newText = props.task.text;
    editMode.value = false;
    return;
  }
  emit('rename-task', taskId, newText);
  editMode.value = false;
}

function cancelEdit() {
  editMode.value = false;
}
</script>

<template>
  <div class="kan_task" :data-task-id="task.id">
    <span class="drag-handle">☰</span>
    <div @click="startRenameTask" class="kan_text">
      <h1 v-if="!editMode">{{ task.text }}</h1>
      <input v-if="editMode" type="text" ref="inputRef" v-model="editedText"
        @keyup.enter="finishRenameTask(task.id, editedText)" @keyup.esc="cancelEdit" />
    </div>
    <div class="kan_delete">
      <button @click="deleteTask(task.id)">X</button>
    </div>
  </div>
</template>

<style scoped>
.kan_task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  text-align: center;
  min-height: 60px;
  width: 93%;
}

.kan_text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 100%;
  width: 80%;
  font-size: 0.7rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.kan_text input {
  width: 80%;
  font-size: 2em;
  font-weight: bold;
  border: none;
  outline: none;
  box-shadow: none;
}

.kan_text input:focus {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

.kan_delete {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.kan_delete button {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #000000;
  background-color: tomato;
  color: #fff;
  cursor: pointer;
  transition: 0.5s background-color;
}

.kan_delete button:hover {
  background-color: #c6503c;
}

.drag-handle {
  cursor: grab;
  margin-right: 10px;
}
</style>
