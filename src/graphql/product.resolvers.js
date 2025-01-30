const ProductsService = require('./../services/product.service');
const service = new ProductsService();

const getProduct = (_, { id }) => {
  return service.findOne(id);
};

const getProducts = (_, args) => {
  return service.find({});
};

const addProduct = (_, { dto }) => {
  return service.create(dto);
};

const updateProduct = (_, { id, dto }) => {
  return service.update(id, dto);
};

const deleteProduct = (_, { id }) => {
  return service.delete(id);
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
