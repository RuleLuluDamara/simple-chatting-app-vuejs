import { CollectionConfig } from "payload/types";
import { authenticatedUser } from "../access/auth-services";
import { authorOrAdmin } from "../access/authorOrAdmin";

const Chats: CollectionConfig = {
  slug: "chats",
  auth: {
    disableLocalStrategy: true,
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "content",
      type: "text",
      required: true,
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: "accounts",
      hasMany: false,
      required: true,
    },
    {
      name: "receiver",
      type: "relationship",
      relationTo: "accounts",
      hasMany: false,
      required: true,
    },

    // {
    //   name: "receiverType",
    //   type: "select",
    //   options: ["user", "group"],
    //   required: true,
    // },
    // {
    //   name: "receiverGroup",
    //   type: "relationship",
    //   relationTo: "channels",
    //   hasMany: false,
    //   admin: {
    //     condition: ({ values }) => values.receiverType === "group", // Hanya ditampilkan saat receiverType adalah 'group'
    //   },
    // },
    // {
    //   name: "receiverUser",
    //   type: "relationship",
    //   relationTo: "users",
    //   hasMany: false,
    //   admin: {
    //     condition: ({ values }) => values.receiverType === "user", // Hanya ditampilkan saat receiverType adalah 'user'
    //   },
    // },
  ],
};

export default Chats;
