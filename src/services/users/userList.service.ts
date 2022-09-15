import { AppDataSource } from "../../data-source";
import { IList } from "../../interfaces/pagination.interface";
import User from "../../models/user.model";
import { getUrl } from "../../utils";

export default class UserListService {
  async execute({ page, per_page }: IList): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    if (!per_page) {
      per_page = 20;
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
