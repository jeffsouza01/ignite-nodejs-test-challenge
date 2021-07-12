import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { User } from "@modules/users/entities/User";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

let statementsRepository: InMemoryStatementsRepository;
let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let user: User;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Create Statement", () => {

  beforeEach( async()=> {
    usersRepository = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    createStatementUseCase = new CreateStatementUseCase(usersRepository ,statementsRepository);


    user = await createUserUseCase.execute({
      email: "email@test.com",
      name: "User Test",
      password: "password"
    });

  })

  it("should be able to create a new Statement", async ()=> {


    const user_id = user.id;


    const newStatement: ICreateStatementDTO = await createStatementUseCase.execute({
      user_id,
      amount: 1500,
      type: OperationType.DEPOSIT,
      description: "Test Description"
    });

    expect(newStatement).toHaveProperty('id');

  });
});
