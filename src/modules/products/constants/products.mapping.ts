export const ProductMappingProps = {
  id: { type: 'long' },
  name: { type: 'text' },
  price: { type: 'double' },
  gender: { type: 'text' },
  condition: { type: 'text' },
  status: { type: 'text' },
  isNew: { type: 'boolean' },
  brands: {
    properties: {
      id: { type: 'long' },
      name: { type: 'text' },
      isNew: { type: 'boolean' },
    },
  },
  sizes: {
    properties: {
      id: { type: 'long' },
      name: { type: 'text' },
    },
  },
  countries: {
    properties: {
      id: { type: 'long' },
      name: { type: 'text' },
    },
  },
};
