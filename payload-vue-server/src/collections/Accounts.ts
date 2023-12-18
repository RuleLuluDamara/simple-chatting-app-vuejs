import { CollectionConfig } from "payload/types";

const Accounts: CollectionConfig = {
  slug: "accounts",
  auth: {
    cookies: {
      sameSite: "strict",
      secure: true,
    },
  },
  admin: {
    useAsTitle: "username",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "username",
      type: "text",
      minLength: 4,
      maxLength: 20,
      required: true,
    },
  ],
};

export default Accounts;
