<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
let todos = ref([]);
let page = ref(1);
const dummyLoop = 9;

onMounted(() => {
  getData();
});
const displayedTodos = computed(() => {
  return todos.value.slice(page.value * 9 - 9, page.value * 9);
});
const selectPageHandler = (i) => {
  if (i >= 1 && i <= Math.ceil(todos.value.length / 9) && i !== page.value)
    page.value = i;
};
const getData = async () => {
  let response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  todos.value = response.data;
};
const getRandomColor = () => {
  let color = `hsl(${Math.random() * 360},100%,75%)`;
  return `background-color : ${color}`;
};
</script>

<template>
  <!-- Todo List Code -->
  <div
    v-if="todos.length > 0"
    class="container-fluid"
    style="min-height: inherit"
  >
    <ul>
      <li
        :style="getRandomColor()"
        v-for="todo in displayedTodos"
        :key="todo.id"
      >
        <div class="info">
          <span class="profile">
            <img src="../assets/avatar.svg" alt="user avatar" />
            <b>User {{ todo.userId }} </b>
          </span>
        </div>
        <h4>{{ todo.title }}</h4>

        <div class="button">
          <button class="delete-icon">Delete</button>
          <router-link to="/add">
            <button class="edit-icon">Edit</button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
  <!-- Shimmer Code -->
  <div v-else class="container-fluid" style="min-height: inherit">
    <ul>
      <li bg-grey v-for="item in dummyLoop">
        <div class="info">
          <span class="profile">
            <img
              class="border-radius-50"
              src="../assets/img/default-150x150.png"
              alt="user avatar"
            />
            <b>------- </b>
          </span>
        </div>
        <h4>----------</h4>

        <div class="button">
          <button class="delete-icon">----</button>
          <button class="edit-icon-dummy">----</button>
        </div>
      </li>
    </ul>
  </div>
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
      :class="page === Math.ceil(todos.length / 9) ? 'pagination__disable' : ''"
      @click="selectPageHandler(page + 1)"
      >▶️</span
    >
  </div>
</template>
<style scoped>
ul {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
ul li {
  box-shadow: 0rem 1rem 5rem hsla(0, 0%, 71%, 0.2);
  border: none;
  margin: 10px;
  width: 30%;
  padding: 0px 20px;
  border-radius: 10px;
  height: 225px;
  display: flex;
  flex-direction: column;
}
ul li:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  transition: all 100ms ease;
  cursor: pointer;
}
ul li img {
  width: 40px;
}
ul li .button {
  display: flex;
  justify-content: space-evenly;
  height: 20%;
}
ul li .delete-icon {
  border: none;
  width: 40%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(74, 74, 74);
  color: white;
  cursor: pointer;
}
ul li .delete-icon:hover {
  background-color: rgb(217, 217, 217);
  color: #2f2e2e;
}
ul li a {
  display: flex;
  align-items: center;
  width: 40%;
}
ul li .edit-icon {
  border: none;
  width: 100%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(74, 74, 74);
  color: white;
  cursor: pointer;
}

ul li .edit-icon:hover {
  background-color: rgb(217, 217, 217);
  color: #2f2e2e;
}
ul li .edit-icon-dummy {
  border: none;
  width: 40%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(74, 74, 74);
  color: white;
  cursor: pointer;
}

ul li .edit-icon-dummy:hover {
  background-color: rgb(217, 217, 217);
  color: #2f2e2e;
}
ul li .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
}
ul li .info .profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-weight: 900;
}

ul li h4 {
  width: 100%;
  height: 55%;
  padding: 10px 10px;
  word-wrap: break-word;
  font-size: 1rem;
  line-height: 30px;
  hyphens: auto;
  font-weight: 550;
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
