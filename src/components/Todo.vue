<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const props = defineProps({
  title: String,
  completed: Boolean,
  id: Number,
});
const handleCheckboxChange = () => {
  checkbox.value = !checkbox.value;
};
let checkbox = ref(props.completed);
const getRandomColor = () => {
  let color = `hsl(${Math.random() * 360},100%,75%)`;
  return `background-color : ${color}`;
};
</script>

<template>
  <!-- Todo List Code -->

  <div
    class="container"
    :class="checkbox ? 'disabled' : ''"
    :style="getRandomColor()"
  >
    <!-- {{ checkbox }} -->
    <div class="profile">
      <span class="img">
        <img class="mx-2" src="../assets/avatar.svg" alt="user avatar" />
        <b>User </b>
      </span>
      <span>
        <label for="completed">
          <input
            type="checkbox"
            @change="handleCheckboxChange()"
            name="completed"
            :checked="checkbox"
          />
          Completed
        </label>
      </span>
    </div>

    <h4>{{ title }}</h4>

    <div class="button">
      <button class="delete-icon">Delete</button>
      <router-link :class="checkbox ? 'disabledBtn' : ''" :to="'/edit/' + id">
        <button class="edit-icon">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.disabled {
  color: gray;
  text-decoration: line-through;
}

.disabledBtn {
  pointer-events: none;
  user-select: none;
}

.container:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  transition: all 100ms ease;
  cursor: pointer;
}

.container {
  width: 400px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  border-radius: 20px;
}
.container .profile {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-weight: 900;
}
.container h4 {
  width: 100%;
  height: 55%;
  padding: 10px 10px;
  word-wrap: break-word;
  font-size: 1.4rem;
  line-height: 30px;
  hyphens: auto;
  font-weight: 550;
}
.container .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
}
.container img {
  width: 40px;
}

.container .button {
  display: flex;
  justify-content: space-evenly;
  height: 20%;
  width: 100%;
}

.container a {
  display: flex;
  align-items: center;
  width: 40%;
}

.container .delete-icon {
  border: none;
  width: 40%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(74, 74, 74);
  color: white;
  cursor: pointer;
}

.container .delete-icon:hover {
  background-color: rgb(217, 217, 217);
  color: #2f2e2e;
}
.container .edit-icon {
  border: none;
  width: 100%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(74, 74, 74);
  color: white;
  cursor: pointer;
}

.container .edit-icon:hover {
  background-color: rgb(217, 217, 217);
  color: #2f2e2e;
}
</style>
