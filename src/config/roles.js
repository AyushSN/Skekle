const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getData', 'manageData']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getData', 'manageData','manageCustomers','getCustomers']);

module.exports = {
  roles,
  roleRights,
};
