/**
 * Get Authenticated
 */
export const getAuthentication = state => state.Auth.authenticated;

/**
 * Get Password
 */
export const getPassword = state => state.Auth.password;

/**
 * Get loading
 */
export const getLoading = state => state.Auth.loading;

/**
 * Get error
 */
export const getError = state => state.Auth.error;
