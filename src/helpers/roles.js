/**
 * check if a role is included on defined roles.
 * @param {string[]} roles
 * @param {string} role
 */
export default (roles, role) => roles.includes('*') || roles.includes(role)
