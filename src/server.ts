import app from "./app";
import { AppDataSource } from "./data-source";
(async () => {
  await AppDataSource.initialize().catch((err) =>
    console.error("Error during data source initialization", err)
  );

  const port = 3333;

  app.listen(process.env.PORT || port, () => {
    console.log(`Running at port ${process.env.PORT || port}`);
  });
})();
