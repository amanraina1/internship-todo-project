import { createStore } from "vuex";
import axios from "axios";
import router from "./routes";

const store = createStore({
  state: {
    todos: [],
  },
  getters: {
    getAllTodos: (state) => {
      return state.todos;
    },
    getTodoById: (state) => (id) => {
      // console.log(id);
      return state.todos.find((todo) => todo.id === Number(id));
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      commit("setTodos", response.data);
    },
    async addTodo({ commit }, payload) {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: payload.title,
          completed: payload.completed,
        }
      );
      if (response.status === 201) {
        await router.push("/");
      }

      commit("addTodo", response.data);
    },
    async updateTodo({ commit }, payload) {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
        {
          title: payload.title,
        }
      );
      // if (response.status === 201) {
      //   await router.push("/");
      // }

      // commit("updateTodo", response.data);
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      commit("deleteTodo", id);
    },
  },
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    addTodo: (state, todo) => state.todos.unshift(todo),
    deleteTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
  },
});
export default store;
