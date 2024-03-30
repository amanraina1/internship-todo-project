import { mount } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/components/Home.vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("Home", () => {
  const router = createRouterMock({});
  let storeOptions;
  let store;
  beforeEach(() => {
    injectRouterMock(router);
    storeOptions = {
      modules: {
        state: {
          // Mock state with your data
          data: [
            { id: 1, title: "Doe", completed: false },
            { id: 2, title: "Janyyy", completed: true },
            { id: 3, title: "Jane", completed: true },
          ],
        },
      },
    };
    const store = new Vuex.Store({ ...storeOptions });
  });

  const mockRouter = {
    push: jest.fn(),
  };
  let wrapper = mount(Home, {
    global: {
      mocks: {
        $router: mockRouter,
      },
      plugins: [store],
    },
    router,
  });

  it("tests if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("tests input fields", async () => {
    expect(wrapper.findAll("button").length).toEqual(1);
    expect(wrapper.findAll("button").at(0).text()).toMatch("List Todo");
  });

  it("tests renders correctly with data from the Vuex store", async () => {
    // Assert that the table exists
    expect(wrapper.find("table").exists()).toBe(true);

    // Assert the number of rows
    wrapper.vm.data = [...storeOptions.modules.state.data];
    await wrapper.vm.$nextTick();
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(storeOptions.modules.state.data.length);

    // Assert the number of columns
    const columns = wrapper.findAll("thead th");
    expect(columns.length).toBe(4);

    // Assert the content of each list item
    expect(rows[0].text()).toContain("Doe");
    expect(rows[1].text()).toContain("Janyyy");
    expect(rows[2].text()).toContain("Jane");
  });

  it("tests sorts items correctly by name when the name column is clicked", async () => {
    // Assert that the table exists
    expect(wrapper.find("table").exists()).toBe(true);
    wrapper.vm.data = [...storeOptions.modules.state.data];
    wrapper.vm.count = true;

    const rows = wrapper.findAll("tbody tr");

    await wrapper.find("button").trigger("click");

    // Assert the order of the first column after sorting
    expect(rows[0].text()).toContain("Doe");
    expect(rows[1].text()).toContain("Jane");
    expect(rows[2].text()).toContain("Janyyy");
  });

  it("tests opens modal when button is clicked", async () => {
    expect(wrapper.vm.isOpen).toBe(false);

    // Click on the button to open the modal
    await wrapper.find('[data-test-id="deleteBtn"]').trigger("click");
    await wrapper.vm.$nextTick();

    // Assert that the modal is rendered
    expect(wrapper.vm.isOpen).toBe(true);
  });
});
