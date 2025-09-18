import { authOptions } from "./options";
import { getServerSession } from "next-auth";

export function authSession() {
  return getServerSession(authOptions);
}
