import {
  MissingParameters,
  WrongTypeParameter,
} from "../../shared/helpers/errors/controllerErrors.js";
import {
  BadRequest,
  OK,
  NotFound,
  InternalServerError,
} from "../../shared/helpers/externalInterfaces/httpCodes.js";
import { NoItemsFound } from "../../shared/helpers/errors/usecaseErrors.js";
import { EntityError } from "../../shared/helpers/errors/domainErrors.js";

export class GetUserController {
  constructor(usecase) {
    this.usecase = usecase;
  }

  async call(request) {
    try {
      if (request.data.email === undefined) {
        throw new MissingParameters("email");
      }

      if (typeof request.data.email !== "string") {
        throw new WrongTypeParameter(
          "email",
          "string",
          typeof request.data.email
        );
      }

      const user = await this.usecase.call(request.data.email);

      const viewmodel = {
        user: user.toJSON(),
        message: "the user was retrieved",
      };

      const response = new OK(viewmodel);
      return response;
    } catch (error) {
      if (error instanceof EntityError) {
        return new BadRequest(error.message);
      }
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message);
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message);
      }
      if (error instanceof WrongTypeParameter) {
        return new BadRequest(error.message);
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message);
      }
    }
  }
}
