<script setup>
import { ref } from "vue";
import { useToast } from "../../node_modules/vue-toastification";
const toast = useToast();
import store from "@/store";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
const title = ref("");

const addTodo = async () => {
  if (title.value === "") {
    return;
  }
  await store.dispatch("addTodo", {
    title: title.value,
    completed: false,
  });
  toast.success("Added Successfully!!");
};

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
</script>
<template>
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Add Todo</h3>
      </div>
      <Form @submit="addTodo" :validation-schema="schema">
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Add Title</label>
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
        </div>

        <div class="card-footer">
          <button class="btn btn-primary">Add Todo</button>
        </div>
      </Form>
    </div>
  </div>
</template>
