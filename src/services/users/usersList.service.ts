import { AppDataSource } from "../../data-source";
import User from "../../entities/users";
import { IList } from "../../interfaces/list";
import { IUserCreateReturn } from "../../interfaces/users";
import { getUrl } from "../../utils";

export default class UsersListService {
  async execute({ page, per_page }: IList): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    if (!per_page) {
      per_page = 5;
    }

    if (!page) {
      page = 1;
    }

    const count = await userRepository.count();

    const pages = Math.ceil(count / per_page);

    const prev =
      page <= 1
        ? null
        : `${getUrl()}/users?per_page=${per_page}&page=${page - 1}`;

    const next =
      page >= pages
        ? null
        : `${getUrl()}/users?per_page=${per_page}&page=${page + 1}`;

    const users = await userRepository.find({
      skip: per_page * (page - 1),
      take: per_page,
    });

    const result = users.map((user: any): any => {
      delete user.password;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        create_at: user.created_at,
        update_at: user.updated_at,
      };
    });

    return {
      info: {
        count,
        pages,
        next,
        prev,
      },
      results: users,
    };
  }
}