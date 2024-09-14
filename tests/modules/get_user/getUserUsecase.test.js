import { GetUserUsecase } from "../../../src/modules/getUser/getUserUsecase.js";
import { describe, test, expect } from "vitest";
import { User } from "../../../src/shared/domain/entities/user.js";
import { UserRepositoryMock } from "../../../src/shared/infra/repositories/userRepositoryMock.js";

const repo = new UserRepositoryMock();

describe("Get User Usecase Tests", () => {
  test("Test getUser Usecase", async () => {
    const email = "nen@pukaon.dj";
    const usecase = new GetUserUsecase(repo);

    const user = await usecase.call(email);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toEqual("Beulah Watkins");
  });

  test("Test getUser No Items Found", async () => {
    const id = "waik@riwusic.ca";
    const usecase = new GetUserUsecase(repo);

    await expect(usecase.call(id)).rejects.toThrowError(
      "No items found for email"
    );
  });

  test("Test getUser invalid emial", async () => {
    const email = "12";
    const usecase = new GetUserUsecase(repo);

    await expect(usecase.call(email)).rejects.toThrowError(
      "Field email is not valid"
    );
  });
});
