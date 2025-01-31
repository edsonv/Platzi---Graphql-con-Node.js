const { checkJwtGql } = require('../utils/checkJwtGql');
const { checkRolesGQL } = require('../utils/checkRolesGql');
const CategoryService = require('./../services/category.service');
const service = new CategoryService();
const boom = require('@hapi/boom');

const addCategory = async (_, { dto }, context) => {
  const user = checkJwtGql(context);

  checkRolesGQL(user, 'admin');

  return service.create(dto);
};

module.exports = { addCategory };
