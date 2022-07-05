import { Request, Response } from "express";


export default class ClientController {
  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showClient = new ShowClientService();

    const client = await showClient.execute(id);

    return res.json(client);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, lastName, email, cellphone } = req.body;

    const updateClient = new UpdateClientService();

    const updated = await updateClient.execute({
      id,
      name,
      lastName,
      email,
      cellphone,
    });

    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClient = new DeleteClientService();

    const deleted = await deleteClient.execute(id);
  }
}