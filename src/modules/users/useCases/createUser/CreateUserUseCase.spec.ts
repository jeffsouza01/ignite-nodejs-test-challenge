import { CreateUserUseCase } from "./CreateUserUseCase";
import {InMemoryUsersRepository} from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError";
import { ICreateUserDTO } from "./ICreateUserDTO";


let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", ()=> {
  beforeEach(()=> {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase  = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = await createUserUseCase.execute({
      email: "email@test.com",
      name: "User Test",
      password: "password"
    });

    expect(user).toHaveProperty("id")

  });

  it("should not be able to create a new user if user already exists", ()=> {
    expect(async ()=> {
      await createUserUseCase.execute({
        email: "email@test.com",
        name: "User Test",
        password: "password"
      });

      const user = await createUserUseCase.execute({
        email: "email@test.com",
        name: "User Test",
        password: "password"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  })

});
