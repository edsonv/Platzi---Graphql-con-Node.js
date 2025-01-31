const boom = require('@hapi/boom');

function checkRolesGQL(user, ...roles) {
  if (!roles.includes(user.role)) {
    throw boom.unauthorized('Your role is not allowed');
  }
}

module.exports = { checkRolesGQL };
