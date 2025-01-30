const getProduct = (_, { id }) => {
  return {
    id,
    name: 'product 1',
    price: '100.12',
    description: 'Bla bla bla',
    image: 'http://image.asas',
    createdAt: new Date().toISOString(),
  };
};

const getProducts = (_, args) => {
  return [];
};

const addProduct = (_, args) => {
  // code
};

module.exports = { getProduct, getProducts, addProduct };
