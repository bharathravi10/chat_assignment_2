export enum AuthConstants {
  ALL_FIELDS_ERROR = "All fields are required",
  EMAIL_ALREADY_ERROR = "Email already exists",
  SUCCESS_MSG = "User registered successfully",
  REG_ERROR = "Error registering user",
  INVALID_CREDENTIALS = "Invalid credentials",
  LOGIN_SUCCESS_MSG = "Login successful.",
  LOGIN_ERROR = "Error logging in",
}

export enum ChatConstants {
  NO_FILE = "No file uploaded.",
  PENDING = "pending",
  COMPLETED = "completed",
  NO_VALID_DATA = "No valid chat records found.",
  SUCCESS_MSG = "Chat history imported successfully.",
  INTERNAL_SERVER_ERROR = "Internal Server Error.",
}

export enum MiddlewareConstants {
  USER_ERROR = "User not found or deactivated",
  INVALID_TOKEN = "Invalid token",
  UN_AUTH = "Unauthorized",
  ONLY_EXCEL = "Only Excel files are allowed",
}
