<script setup>
import { onMounted, ref } from "vue";
import router from "@/routes";
import { useToast } from "../../node_modules/vue-toastification";
const toast = useToast();
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useStore } from "vuex";
const store = useStore();
let todo = ref([]);
let completed = ref(null);
const id = router.currentRoute.value.params.id;
let title = ref("");

onMounted(async () => {
  await store.dispatch("fetchTodos");
  const allTodos = await store.getters.getAllTodos;
  todo.value = allTodos.find((todo) => todo.id === Number(id));
  title.value = todo.value.title;
  completed.value = todo.value.completed;
});

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

//Function to edit todo
const editTodo = async () => {
  if (title.value === "") {
    return;
  }
  if (
    todo.value.title === title.value &&
    completed.value === todo.value.completed
  ) {
    toast.error("No edit was made");
    return;
  }
  const payload = {
    id,
    title: title.value,
    completed: completed.value,
  };

  await store.dispatch("updateTodo", payload);
  toast.success("Edited Successfully!!");
};
</script>
<template>
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Edit Todo</h3>
      </div>
      <Form @submit="editTodo" :validation-schema="schema">
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Edit Title: </label>
            <Field
              type="text"
              name="title"
              v-model="title"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Title"
            />
            <ErrorMessage class="text-red" name="title" />
          </div>
          <div class="form-group checkbox-input">
            <label for="checkbox-input">Completed: </label>
            <input
              type="checkbox"
              name="checkbox"
              v-model="completed"
              class="form-control"
            />
          </div>
        </div>

        <div class="card-footer">
          <button class="btn btn-primary">Update Todo</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<style scoped>
.checkbox-input {
  position: relative;
  display: flex;
  gap: 10px;
}
.checkbox-input label {
  /* background-color: red; */
}
.checkbox-input input {
  position: absolute;
  height: 50%;
  right: 2rem;
  background-color: red;
}
</style>
