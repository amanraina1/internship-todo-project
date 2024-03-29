import store from "@/store";
import axios from "axios";

jest.mock("axios");
describe("store", () => {
  it("should add a new user and add it to the state", async () => {
    const newUser = {
      id: 7,
      title: "illo expedita consequatur quia in",
      completed: false,
    };
    // set up initial state
    store.state.todos = [];
    // mocking the axios call
    axios.post.mockResolvedValue({ data: newUser });

    // call the action
    await store.dispatch("addTodo", newUser);

    // assertion if the url is correct or not
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/todos", {
      title: newUser.title,
      completed: newUser.completed,
    });

    // assertion
    expect(store.state.todos).toEqual([
      {
        id: 7,
        title: "illo expedita consequatur quia in",
        completed: false,
      },
    ]);
  });
  it("fetches user from the API and commits them to the store", async () => {
    const user = {
      id: 7,
      title: "illo expedita consequatur quia in",
      completed: false,
    };
    // mock the axios.get method
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: 7,
            title: "illo expedita consequatur quia in",
            completed: false,
          },
        ],
      })
    );

    // call the action
    await store.dispatch("fetchTodos");

    // assert that axios.get called with correct url
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/todos");

    // assert that the correct mutation was committed
    expect(store.state.todos).toEqual([user]);
  });
  it("should edit a user and add it to the state", async () => {
    // Arrange
    const newUser = {
      id: 7,
      title: "hello world",
      completed: true,
    };
    // set up initial state
    store.state.todos = [
      {
        id: 7,
        title: "illo expedita consequatur quia in",
        completed: false,
      },
    ];
    // mock the axios.post call to return a fake response
    axios.patch.mockResolvedValue({ data: newUser });

    // Act
    // call the updateTodo action with the title of the new todo
    await store.dispatch("updateTodo", newUser);

    // assert the url
    expect(axios.patch).toHaveBeenCalledWith(
      `http://localhost:3000/todos/${newUser.id}`,
      {
        title: newUser.title,
        completed: newUser.completed,
      }
    );

    // Assert
    // assert that the new user was added to the state
    expect(store.state.todos).toEqual([newUser]);
  });
  it("should edit a checkbox and add it to the state", async () => {
    // Arrange
    const newUser = {
      id: 7,
      title: "illo expedita consequatur quia in",
      completed: true,
    };
    // set up initial state
    store.state.todos = [
      {
        id: 7,
        title: "illo expedita consequatur quia in",
        completed: false,
      },
    ];
    // mock the axios.post call to return a fake response
    axios.patch.mockResolvedValue({ data: newUser });

    // Act
    // call the updateTodo action with the title of the new todo
    await store.dispatch("updateCheckbox", newUser);

    // assert the url
    expect(axios.patch).toHaveBeenCalledWith(
      `http://localhost:3000/todos/${newUser.id}`,
      {
        completed: newUser.completed,
      }
    );

    // Assert
    // assert that the new user was added to the state
    expect(store.state.todos).toEqual([newUser]);
  });
  it("should delete a user and remove it from the state", async () => {
    // Arrange
    const userId = 7;
    // set up initial state
    store.state.todos = [{ id: 7, title: "hello world", completed: true }];
    // mock the axios.delete call to return a fake response

    axios.delete.mockResolvedValue({});

    // Act
    // call the removeRestaurants action with the id of the restaurant to delete
    await store.dispatch("deleteTodo", userId);

    // assert the url
    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:3000/todos/${userId}`
    );

    // Assert
    // assert that the restaurant with id 411518 was removed from the state
    expect(store.state.todos).toEqual([]);
  });
});
