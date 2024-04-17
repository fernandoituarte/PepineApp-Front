import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  loginUser,
  deleteAccount,
  logOut,
} from "../../store/reducer/auth/login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("loginUser thunk", () => {
  let store;
  let httpMock;

  beforeEach(() => {
    store = mockStore({ logged: false });
    httpMock = new MockAdapter(axios);
  });

  afterEach(() => {
    httpMock.reset();
  });

  it("should handle successful login", async () => {
    const mockResponse = { status: "success" };
    httpMock.onPost("/api/users").reply(200, mockResponse);

    await store.dispatch(loginUser({ email: "email", password: "password" }));

    const actions = store.getActions();

    expect(actions[0].type).toBe("user/login/pending");
    expect(actions[1].type).toBe("user/login/fulfilled");
    expect(actions[1].payload).toBe("success");
  });

  it("should handle login failure", async () => {
    httpMock.onPost("/api/users").networkError();
    await store.dispatch(
      loginUser({ username: "user", password: "wrongPass" }),
    );

    const actions = store.getActions();

    expect(actions[0].type).toBe("user/login/pending");
    expect(actions[1].type).toBe("user/login/rejected");
  });
});

describe("deleteAccount thunk", () => {
  let store;
  let httpMock;
  const id = "8";

  beforeEach(() => {
    store = mockStore({});
    httpMock = new MockAdapter(axios);
  });

  afterEach(() => {
    httpMock.reset();
  });

  it("should dispatch the correct actions on successful deletion", async () => {
    const mockResponse = { message: "Account deleted successfully" };
    httpMock.onDelete(`/api/users/${id}`).reply(200, mockResponse);

    await store.dispatch(deleteAccount(id));

    const actions = store.getActions();
    expect(actions[0].type).toBe("user/deleteAccount/pending");
    expect(actions[1].type).toBe("user/deleteAccount/fulfilled");
    expect(actions[1].payload).toEqual(mockResponse);
  });

  it("should dispatch the correct actions on failure", async () => {
    const mockError = { message: "Failed to delete account" };
    httpMock.onDelete(`/api/users/${id}`).reply(500, mockError);

    await store.dispatch(deleteAccount(id));

    const actions = store.getActions();
    expect(actions[0].type).toBe("user/deleteAccount/pending");
    expect(actions[1].type).toBe("user/deleteAccount/rejected");
    expect(actions[1].payload).toEqual(mockError);
  });
});

describe("logOut thunk", () => {
  let store;
  let httpMock;

  beforeEach(() => {
    store = mockStore({});
    httpMock = new MockAdapter(axios);
  });

  afterEach(() => {
    httpMock.reset();
  });

  it("should handle successful logout", async () => {
    const mockResponse = { success: true };
    httpMock.onDelete("/api/users").reply(200, mockResponse);

    await store.dispatch(logOut());

    const actions = store.getActions();

    expect(actions[0].type).toBe("user/logout/pending");
    expect(actions[1].type).toBe("user/logout/fulfilled");
    expect(actions[1].payload.data).toEqual(mockResponse);
  });

  it("should handle logout failure", async () => {
    const mockErrorResponse = { error: "Logout failed." };
    httpMock.onDelete("/api/users").reply(500, mockErrorResponse);

    await store.dispatch(logOut());

    const actions = store.getActions();

    expect(actions[0].type).toBe("user/logout/pending");
    expect(actions[1].type).toBe("user/logout/rejected");
    expect(actions[1].payload).toEqual(mockErrorResponse);
  });
});
