import { CollectionConfig } from "payload/types";

const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'full_name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'birthday',
      type: 'date',
      label: 'Birthday',
      required: true,
    },
  ],
};

export default Customers;
