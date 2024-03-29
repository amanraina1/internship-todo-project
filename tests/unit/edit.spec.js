import { mount, shallowMount } from "@vue/test-utils";
import Edit from "@/components/Edit.vue";
import store from "@/store";

describe("Edit", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  let wrapper = mount(Edit, {
    global: {
      mocks: {
        $router: mockRouter,
      },
      plugins: [store],
    },
  });
  it("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("testing input fields", async () => {
    expect(wrapper.findAll("input").length).toEqual(2);
    expect(wrapper.findAll("button").length).toEqual(1);
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("button").at(0).text()).toMatch("Update Todo");
  });
  it("sets value in input field", async () => {
    const input = wrapper.find("input");

    await input.setValue("By the Highway");

    expect(input.element.value).toBe("By the Highway");
  });
});
