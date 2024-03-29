import { mount } from "@vue/test-utils";
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

    await input.setValue("By the Highway");

    expect(input.element.value).toBe("By the Highway");
  });
});
