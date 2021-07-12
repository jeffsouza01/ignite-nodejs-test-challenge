import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IAuthenticateUserResponseDTO } from "./IAuthenticateUserResponseDTO"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError"


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


  it("should be not able to authenticate a invalid user", () => {

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "Invalid User",
        password: "No Password"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });


  it("should be not able to authenticate a invalid password", async() => {
    const user : ICreateUserDTO = {
      email: "user_email@test.com",
      name: "New User Test",
      password: "password"
    }

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "No Password"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
})
