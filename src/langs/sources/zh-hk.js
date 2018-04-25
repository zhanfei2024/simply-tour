const language = {
  // Validation
  validation: {
    "required": "{{field}} 必須填寫.",
    "ip": '{{field}} 需填寫有效IP地址.',
    alpha: '{{field}} 只接受英文字母.',
    alpha_num: '{{field}} 只接受英文字母及數字.',
    "date": "{{field}} 不是有效日期格式.",
    "email": "{{field}} 需填寫正確郵件地址.",
    "in": "{{field}} 無效選取.",
    "between": "{{field}} 只接受 {{argument.0}} 至 {{argument.1}}之間.",
    "exists": "{{field}} 無效選取.",
    "unique": "{{field}} 重復.",
    "min": "{{field}} must be an integer great than or equal to {{argument.0}}",
    "max": "{{field}} must be an integer small than or equal to {{argument.0}}",
    "array": "{{field}} must be an array.",
    "numeric": "{{field}} must be a number.",
    "boolean": "{{field}} field must be true or false.",
    "integer": "{{field}} must be an integer.",
    "json": "{{field}} must be a valid JSON string.",
    "string": "{{field}} must be a string.",
    uppercase: '{{field}} must be a uppercase letter.',
    lowercase: '{{field}} must be a lowercase letter.',
    image: '{{field}} field must be an image.',
    dimensions: '{{field}} has invalid image dimensions.',
    dateIso8601: '{{field}} is not a valid date.',
    size: '{{field}} must be exactly {{argument.0}}.',
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
