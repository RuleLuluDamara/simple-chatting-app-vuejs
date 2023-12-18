import { Access } from "payload/config";

export const authorOrAdmin: Access = ({ req: { user } }) => {
  if (!user) {
    return false;
  }

  if (user.collection === "users" || user.collection === "accounts") {
    return true;
  }

  return {
    sender: {
      equals: user.id,
    },
  };
};
