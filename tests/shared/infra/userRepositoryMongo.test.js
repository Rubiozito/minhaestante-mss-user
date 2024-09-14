import { UserRepositoryMongo } from "../../../src/shared/infra/repositories/userRepositoryMongo.js";
import { UserRepositoryMock } from "../../../src/shared/infra/repositories/userRepositoryMock.js";
import { describe, test, expect } from "vitest";

const repo_mock = new UserRepositoryMock();
const repo_mongo = new UserRepositoryMongo();
describe("User Repository Mongo", () => {
  test("Should create a user", async () => {
    const user = repo_mock.users[0];
    const newUser = await repo_mongo.createUser(user);

    console.log(newUser);
  });
});
