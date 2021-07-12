import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { User } from "@modules/users/entities/User";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let userRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let statementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;
let user:User;

describe("Get Balance", ()=> {
  beforeEach(async ()=> {
    userRepository = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(statementsRepository,userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);

    user = await createUserUseCase.execute({
      email: "email@test.com",
      name: "User Test",
      password: "password"
    });
  });


  it("should be able to get balance", async ()=> {
    const user_id = user.id;

    const balance = await getBalanceUseCase.execute({user_id});

    expect(balance).toHaveProperty("statement");
    expect(balance).toHaveProperty("balance");
  });

  it("should not be able to get balance to invalid user", ()=> {

    expect(async ()=> {
      const user_id = "invalid id";
      await getBalanceUseCase.execute({user_id});
    }).rejects.toBeInstanceOf(GetBalanceError);
  })
});
