import auth from "./auth";
import admin from "./admin";
import school from "./school";
import exam from "./exam";
import pub from "./public";

export const Routes = [
  { basePath: "/auth", router: auth },
  { basePath: "/admin", router: admin },
  { basePath: "/school", router: school },
  { basePath: "/exam", router: exam },
  { basePath: "/public", router: pub },
];
