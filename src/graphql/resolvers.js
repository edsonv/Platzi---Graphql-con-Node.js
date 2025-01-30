const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./product.resolvers');

const resolvers = {
  Query: {
    hello: () => 'Hola mundo',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I am ${args.age} years old`,
    getInt: (_, { number }) => number,
    getFloat: (_, { number }) => number,
    getString: () => 'Esta es una cadena',
    getBoolean: () => true,
    getID: () => '123123123',
    getNumbers: (_, { numbers }) => numbers,
    product: getProduct,
    products: getProducts,
  },
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
  },
};

module.exports = resolvers;
