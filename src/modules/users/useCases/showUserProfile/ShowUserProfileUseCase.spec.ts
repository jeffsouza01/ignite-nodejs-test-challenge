import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepository : InMemoryUsersRepository;
let showUserProfileUseCase : ShowUserProfileUseCase

describe("Show User Profile", ()=> {
  beforeEach(()=> {
    usersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
  })

  it("should be able to show the user profile", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      email: "email@test.com",
      password: "password"
    }

    const userCreated = await usersRepository.create(user);

    const showUser = await showUserProfileUseCase.execute(userCreated.id);

    expect(userCreated).toEqual(showUser);

  });


  it("should not be able to show the invalid user", () => {

    expect(async ()=> {
      await showUserProfileUseCase.execute("teste");

    }).rejects.toBeInstanceOf(ShowUserProfileError)

  });


})
