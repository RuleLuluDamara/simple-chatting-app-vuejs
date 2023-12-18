import { CollectionConfig } from "payload/types";

const Channels: CollectionConfig = {
  slug: "channels",
  auth: {
    disableLocalStrategy: true,
  },
  admin: {
    useAsTitle: "channels_name",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "channels_name",
      type: "text",
      label: "channels name",
      required: true,
    },
    // {
    //   name: "messages",
    //   type: "relationship",
    //   relationTo: "messages",
    //   hasMany: true,
    //   required: false,
    // },
  ],
};

export default Channels;
