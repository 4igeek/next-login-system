export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // Check maximum length
  if (password.length > 128) {
    errors.push("Password must not exceed 128 characters");
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Check for number
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Check for special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push(
      'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
    );
  }

  // Check for whitespace at beginning or end
  if (password.trim() !== password) {
    errors.push("Password must not have leading or trailing whitespace");
  }

  // Check for repeating characters
  if (/(.)\1{3,}/.test(password)) {
    errors.push(
      "Password must not contain the same character repeated more than 3 times in a row"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
