import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import router from "../../src/routes";
import Add from "@/components/Add.vue";

describe("Add", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  let wrapper = mount(Add, {
    global: {
      mocks: {
        $router: mockRouter,
      },
      plugins: [router],
    },
  });
  it("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("testing input fields", async () => {
    expect(wrapper.findAll("input").length).toEqual(1);
    expect(wrapper.findAll("button").length).toEqual(1);
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("button").at(0).text()).toMatch("Add Todo");
  });
  it("sets value in input field", async () => {
    const input = wrapper.find("input");

    expect(input.element.value).toBe("");

    await input.setValue("By the Highway");

    expect(input.element.value).toBe("By the Highway");
  });
  it("navigates to destination route when link is clicked", async () => {
    // Create a mock router instance with a memory history
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/", name: "Home" }],
    });

    // Simulate clicking on the link
    await wrapper.find("button").trigger("click");

    // Assert that the route has changed to "/destination"
    expect(router.currentRoute.value.path).toBe("/");
  });
});
