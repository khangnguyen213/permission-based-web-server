export const RESPONSE_MESSAGES = {
  ERROR_EMAIL_ALREADY_EXISTS: 'Email already exists',
  ERROR_REGISTER_USER: 'Error registering user',
  ERROR_LOGIN: 'Error logging in',
  ERROR_USER_NOT_FOUND: 'User not found',
  ERROR_PASSWORD_INCORRECT: 'Password is incorrect',
  ERROR_UPDATE_WITHOUT_DATA: 'At least one field must be provided to update.',
  ERROR_ROLE_NOT_FOUND: 'Role not found',
  ERROR_ROLE_ALREADY_EXISTS: 'Role already exists',
  ERROR_PERMISSION_NOT_FOUND: 'Permission not found',
  ERROR_UNKNOW: 'Unknown error',
};

export const ROLE_PERMISSIONS = {
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  ROLE_CREATE: 'role:create',
  ROLE_READ: 'role:read',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
};
