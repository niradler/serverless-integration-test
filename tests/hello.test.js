jest.setTimeout(30000); // incease jest timeout to 30s
const axios = require("axios"); // http library to create the http call
const { startSlsOffline, stopSlsOffline } = require("./slsUtils");
// utililty to start and stop the serverless offline plugin.

const domain = "http://localhost:3000"; //make sue to change to the port you are using

beforeAll(async () => {
  await startSlsOffline();
});

afterAll(() => {
  stopSlsOffline();
});

test("hello function", async () => {
  try {
    const name = "TestName";
    const res = await axios.post(`${domain}/dev/hello`, {
      name,
    });
    expect(res).toBeDefined();
    const { data } = res;
    expect(data).toBeDefined();
    expect(data.body).toBeDefined();
    expect(typeof data.body).toBe("object");
    expect(data.body.name).toBe(name);
  } catch (error) {
    throw error;
  }
});
