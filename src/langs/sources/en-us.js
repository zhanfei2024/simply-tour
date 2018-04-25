const language = {
  // Validation
  validation: {
    "required": "The {{field}} field is required.",
    "ip": 'The {{field}} must be a valid IP address.',
    alpha: 'The {{field}} may only contain letters.',
    alpha_num: 'The {{field}} may only contain letters and numbers.',
    "date": "The {{field}} is not a valid date.",
    "email": "The {{field}} must be a valid email address.",
    "in": "The selected {{field}} is invalid.",
    "isInt": "The {{field}} must be a valid integer.",
    "isLength": "The {{field}} must be a between {{argument.0}} to {{argument.1}}.",
    "between": "The {{field}} must be a between {{argument.0}} to {{argument.1}}.",
    "exists": "The selected {{field}} is invalid.",
    "unique": "The {{field}} has already been taken.",
    "min": "The {{field}} must be an integer great than or equal to {{argument.0}}",
    "max": "The {{field}} must be an integer small than or equal to {{argument.0}}",
    "array": "The {{field}} must be an array.",
    "numeric": "The {{field}} must be a number.",
    "boolean": "The {{field}} field must be true or false.",
    "integer": "The {{field}} must be an integer.",
    "json": "The {{field}} must be a valid JSON string.",
    "string": "The {{field}} must be a string.",
    uppercase: 'The {{field}} must be a uppercase letter.',
    lowercase: 'The {{field}} must be a lowercase letter.',
    image: 'The {{field}} field must be an image.',
    dimensions: 'The {{field}} has invalid image dimensions.',
    dateIso8601: 'The {{field}} is not a valid date.',
    size: 'The {{field}} must be exactly {{argument.0}}.',
  },

  // Auth
  "Email/Password is incorrect.": "Email/Password is incorrect.",
  "You do not have permission to access.": "You do not have permission to access.",
  "Invalid access.": "Invalid access.",
  "authorization token is incorrect.": "authorization token is incorrect.",
  "The access token provided has expired.": "The access token provided has expired.",
  "The access token was not found": "The access token was not found",

  // Common
  "Not Found": "Not Found",
  "file required": "file required",
  "un-suppot format": "un-suppot format",
};

module.exports = language;
