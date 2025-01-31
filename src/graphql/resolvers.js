const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require('./product.resolvers');
const { login } = require('./auth.resolvers');
const { addCategory, getCategory } = require('./category.resolvers');
const { RegularExpression } = require('graphql-scalars');

const CategoryNameType = new RegularExpression(
  'CategoryNameType',
  /^[a-zA-Z0-9]{3,8}$/
);

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
    category: getCategory,
  },
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
    login,
    addCategory,
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory,
  },
};

module.exports = resolvers;
