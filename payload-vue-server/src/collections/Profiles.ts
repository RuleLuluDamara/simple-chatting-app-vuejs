// File: Profil.ts

import { CollectionConfig } from "payload/types";

const Profiles: CollectionConfig = {
  slug: "profiles", // Ganti dari "contact" menjadi "profil"
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
      name: "nama",
      type: "text",
      required: true,
    },
    {
      name: "telp",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "alamat",
      type: "text",
      required: true,
    },
  ],
};

export default Profiles;
