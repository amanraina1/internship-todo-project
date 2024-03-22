<script setup>
import { ref, onMounted, computed } from "vue";
import Todo from "./Todo.vue";
import Loader from "./Loader.vue";
import axios from "axios";
const todos = ref([]);
let page = ref(1);
const dummyLoop = 9;
onMounted(() => getData());

const displayedTodos = computed(() => {
  return todos.value.slice(page.value * 9 - 9, page.value * 9);
});

const selectPageHandler = (i) => {
  if (i >= 1 && i <= Math.ceil(todos.value.length / 9) && i !== page.value)
    page.value = i;
};

const getData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  todos.value = response.data;
};
</script>
<template>
  <div class="container-fluid">
    <ul class="container-fluid">
      <li v-if="todos.length > 0" class="list" v-for="todo in displayedTodos">
        <Todo
          :title="todo.title"
          :completed="todo.completed"
          :id="todo.id"
          :key="todo.id"
        />
      </li>
      <li v-else class="list" v-for="todo in dummyLoop">
        <Loader />
      </li>
    </ul>

    <!-- Pagination Code -->
    <div v-if="todos.length > 0" class="pagination">
      <span
        :class="page === 1 ? 'pagination__disable' : ''"
        @click="selectPageHandler(page - 1)"
        >◀️</span
      >
      <span
        :class="page === i + 1 ? 'pagination__selected' : ''"
        @click="selectPageHandler(i + 1)"
        v-for="(item, i) in [...Array(Math.ceil(todos.length / 9))]"
      >
        {{ i + 1 }}
      </span>
      <span
        :class="
          page === Math.ceil(todos.length / 9) ? 'pagination__disable' : ''
        "
        @click="selectPageHandler(page + 1)"
        >▶️</span
      >
    </div>
  </div>
</template>
<style scoped>
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
ul li {
  display: flex;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.pagination {
  padding: 10px;
  display: flex;
  justify-content: center;
}
.pagination span {
  padding: 5px 10px;
  border: 1px solid grey;
  cursor: pointer;
}
.pagination__selected {
  background-color: rgb(220, 220, 220);
}
.pagination__disable {
  opacity: 0;
}
</style>
