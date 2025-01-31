const boom = require('@hapi/boom');

function checkRolesGql(user, ...roles) {
  if (!roles.includes(user.role)) {
    throw boom.unauthorized('Your role is not allowed');
  }
}

module.exports = { checkRolesGql };
