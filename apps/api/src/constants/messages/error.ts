const ERROR = {
  // -------------------------
  // AUTHENTICATION & TOKEN ERRORS
  // -------------------------
  AUTH_INVALID_CREDENTIALS: {
    code: "AUTH_INVALID_CREDENTIALS",
    message: "Invalid email or password.",
  },
  AUTH_INVALID_PASSWORD: {
    code: "AUTH_INVALID_PASSWORD",
    message: "Password is invalid.",
  },
  AUTH_USER_NOT_FOUND: {
    code: "AUTH_USER_NOT_FOUND",
    message: "User not found.",
  },
  AUTH_EMAIL_NOT_VERIFIED: {
    code: "AUTH_EMAIL_NOT_VERIFIED",
    message: "Email address is not verified.",
  },
  AUTH_TOKEN_MISSING: {
    code: "AUTH_TOKEN_MISSING",
    message: "Authorization token is missing.",
  },
  AUTH_TOKEN_INVALID: {
    code: "AUTH_TOKEN_INVALID",
    message: "Invalid or expired token.",
  },
  AUTH_SESSION_EXPIRED: {
    code: "AUTH_SESSION_EXPIRED",
    message: "Session has expired. Please log in again.",
  },
  AUTH_UNAUTHORIZED: {
    code: "AUTH_UNAUTHORIZED",
    message: "User is not authenticated.",
  },
  AUTH_FORBIDDEN: {
    code: "AUTH_FORBIDDEN",
    message: "You do not have permission to perform this action.",
  },
  AUTH_ACCOUNT_LOCKED: {
    code: "AUTH_ACCOUNT_LOCKED",
    message:
      "Account is temporarily locked due to multiple failed login attempts.",
  },
  AUTH_ACCOUNT_DISABLED: {
    code: "AUTH_ACCOUNT_DISABLED",
    message: "This account has been disabled by an administrator.",
  },

  // -------------------------
  // VALIDATION & INPUT ERRORS
  // -------------------------
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    message: "One or more fields are invalid.",
  },
  VALIDATION_MISSING_FIELD: {
    code: "VALIDATION_MISSING_FIELD",
    message: "A required field is missing.",
  },
  VALIDATION_INVALID_EMAIL: {
    code: "VALIDATION_INVALID_EMAIL",
    message: "Please enter a valid email address.",
  },
  VALIDATION_INVALID_FORMAT: {
    code: "VALIDATION_INVALID_FORMAT",
    message: "Input format is invalid.",
  },
  VALIDATION_PASSWORD_TOO_SHORT: {
    code: "VALIDATION_PASSWORD_TOO_SHORT",
    message: "Password must be at least 8 characters long.",
  },
  VALIDATION_PASSWORD_WEAK: {
    code: "VALIDATION_PASSWORD_WEAK",
    message: "Password must include letters, numbers, and symbols.",
  },
  VALIDATION_INVALID_ID: {
    code: "VALIDATION_INVALID_ID",
    message: "Provided ID is not valid.",
  },
  VALIDATION_INVALID_FILE_TYPE: {
    code: "VALIDATION_INVALID_FILE_TYPE",
    message: "Uploaded file type is not supported.",
  },
  VALIDATION_INVALID_DATE: {
    code: "VALIDATION_INVALID_DATE",
    message: "Date format is invalid.",
  },

  // -------------------------
  // DATABASE ERRORS
  // -------------------------
  DB_CONNECTION_FAILED: {
    code: "DB_CONNECTION_FAILED",
    message: "Failed to connect to the database.",
  },
  DB_QUERY_FAILED: {
    code: "DB_QUERY_FAILED",
    message: "Database query failed.",
  },
  DB_RECORD_NOT_FOUND: {
    code: "DB_RECORD_NOT_FOUND",
    message: "Requested record was not found.",
  },
  DB_DUPLICATE_ENTRY: {
    code: "DB_DUPLICATE_ENTRY",
    message: "Record already exists.",
  },
  DB_CONSTRAINT_VIOLATION: {
    code: "DB_CONSTRAINT_VIOLATION",
    message: "Database constraint violated.",
  },
  DB_TIMEOUT: {
    code: "DB_TIMEOUT",
    message: "Database request timed out.",
  },

  // -------------------------
  // SERVER & INTERNAL ERRORS
  // -------------------------
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: "An unexpected server error occurred.",
  },
  SERVER_MAINTENANCE: {
    code: "SERVER_MAINTENANCE",
    message: "Server is under maintenance. Please try again later.",
  },
  SERVER_UNAVAILABLE: {
    code: "SERVER_UNAVAILABLE",
    message: "Server is temporarily unavailable.",
  },
  SERVER_TIMEOUT: {
    code: "SERVER_TIMEOUT",
    message: "Server took too long to respond.",
  },
  SERVER_CONFIGURATION_ERROR: {
    code: "SERVER_CONFIGURATION_ERROR",
    message: "Server configuration is invalid or incomplete.",
  },

  // -------------------------
  // FILE ERRORS
  // -------------------------
  FILE_NOT_FOUND: {
    code: "FILE_NOT_FOUND",
    message: "The requested file could not be found.",
  },
  FILE_UPLOAD_FAILED: {
    code: "FILE_UPLOAD_FAILED",
    message: "File upload failed.",
  },
  FILE_TOO_LARGE: {
    code: "FILE_TOO_LARGE",
    message: "Uploaded file size exceeds the allowed limit.",
  },
  FILE_READ_ERROR: {
    code: "FILE_READ_ERROR",
    message: "Unable to read the file.",
  },
  FILE_WRITE_ERROR: {
    code: "FILE_WRITE_ERROR",
    message: "Unable to write file to storage.",
  },
  FILE_PERMISSION_DENIED: {
    code: "FILE_PERMISSION_DENIED",
    message: "You do not have permission to access this file.",
  },

  // -------------------------
  // NETWORK / EXTERNAL SERVICES
  // -------------------------
  NETWORK_ERROR: {
    code: "NETWORK_ERROR",
    message: "Network request failed.",
  },
  SERVICE_UNAVAILABLE: {
    code: "SERVICE_UNAVAILABLE",
    message: "External service is unavailable.",
  },
  SERVICE_TIMEOUT: {
    code: "SERVICE_TIMEOUT",
    message: "External service did not respond in time.",
  },
  SERVICE_RESPONSE_ERROR: {
    code: "SERVICE_RESPONSE_ERROR",
    message: "Received an unexpected response from external service.",
  },

  // -------------------------
  // PERMISSIONS / ACCESS
  // -------------------------
  PERMISSION_DENIED: {
    code: "PERMISSION_DENIED",
    message: "You do not have the required permissions.",
  },
  ROLE_NOT_ALLOWED: {
    code: "ROLE_NOT_ALLOWED",
    message: "Your role is not allowed to perform this operation.",
  },
  ACCESS_RESTRICTED: {
    code: "ACCESS_RESTRICTED",
    message: "Access is restricted for this resource.",
  },

  // -------------------------
  // RESOURCE & GENERAL ERRORS
  // -------------------------
  RESOURCE_NOT_FOUND: {
    code: "RESOURCE_NOT_FOUND",
    message: "Requested resource does not exist.",
  },
  RESOURCE_CONFLICT: {
    code: "RESOURCE_CONFLICT",
    message: "Resource already exists or is in conflict.",
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "The request could not be understood or was missing parameters.",
  },
  RATE_LIMIT_EXCEEDED: {
    code: "RATE_LIMIT_EXCEEDED",
    message: "Too many requests. Please slow down.",
  },
  FEATURE_NOT_IMPLEMENTED: {
    code: "FEATURE_NOT_IMPLEMENTED",
    message: "This feature is not yet implemented.",
  },
  OPERATION_FAILED: {
    code: "OPERATION_FAILED",
    message: "The requested operation could not be completed.",
  },
} as const;

export type ErrorCode = keyof typeof ERROR;
export type ErrorInfo = (typeof ERROR)[ErrorCode];
export default ERROR;
