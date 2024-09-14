import { User } from "../../shared/domain/entities/user.js";
import { NoItemsFound } from "../../shared/helpers/errors/usecaseErrors.js";
import { EntityError } from "../../shared/helpers/errors/domainErrors.js";

export class GetUserUsecase {
  constructor(repo) {
    this.repo = repo;
  }

  async call(email) {
    if (!User.validateEmail(email)) {
      throw new EntityError("email");
    }

    const user = await this.repo.getUser(email);
    if (user === null) {
      throw new NoItemsFound("email");
    }

    return user;
  }
}
