import { envs } from "./config";
import { MainDatabase } from "./data/postgres";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
(() => {
  main();
})();

async function main() {
  // todo: await base de datos
  await MainDatabase.connect();

  // todo: inicio de nuestro server
  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
