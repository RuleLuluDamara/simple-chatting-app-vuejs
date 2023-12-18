import { Access } from "payload/config";

export const authenticatedUser: Access = ({ req: { user } }) => {
  // allow authenticated users
  if (!user) {
    return false;
  }
  if (user.collection === "users" || user.collection === "accounts") {
    return true;
  }
  return true;
};

