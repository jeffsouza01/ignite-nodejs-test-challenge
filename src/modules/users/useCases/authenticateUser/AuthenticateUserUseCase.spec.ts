import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IAuthenticateUserResponseDTO } from "./IAuthenticateUserResponseDTO"


let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

  })


  it("should be able to authenticate a user", async () => {
    const user : ICreateUserDTO = {
        email: "email@test.com",
        name: "User test",
        password: "password"

    }

    await createUserUseCase.execute(user)

    const logon = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(logon).toHaveProperty("token");
  });
})
