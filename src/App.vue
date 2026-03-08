<script setup>
import KanbanBoard from './components/KanbanBoard.vue';
</script>

<template>
  <div class="base">
    <div class="header_div">
      <h1>Kanban Board on <span>Vue3</span></h1>
    </div>
    <KanbanBoard />
    <div class="credits">
      <h4>© Created by amigoboy - 2026</h4>
    </div>
    <div class="tip">
      <ul>
        <li>You can <span>drag and drop</span> tasks between columns and reorder them within the same column!</li>
        <li>You can also <span>edit</span> task names by clicking on them.</li>
        <li>Press <span>'Enter'</span> to save changes and <span>'Esc'</span> to cancel.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.base {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100dvh;
}
.header_div {
  display: flex;
  justify-content: space-around;
  text-align: center;
  color: #fff;
}

.header_div span {
  color: #42b983;
}

.credits {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}

.tip {
  width: 200px;
  padding: 10px;
  height: 250px;
  margin: 20px auto;
  background-color: #fffa87;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #505050;
  border-radius: 5px;
  position: absolute;
  right: -120px;
  bottom: -220px;
  transition: 0.5s transform;
  cursor: pointer;
}

.tip ul {
  list-style-type: disc;
  padding-left: 20px;
}

.tip li {
  margin-bottom: 10px;
}

.tip span {
  font-weight: bold;
  color: rgb(255, 38, 0);
}

.tip:hover {
  transform: translateX(-60%) translateY(-80%);
}

@media (max-width: 768px) {
  .header_div {
    margin-bottom: 0px;
  }
  .tip {
    display: none;
  }
}
</style>
