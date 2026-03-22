import * as Yup from 'yup';

export const registerSchema = Yup.object({
  username: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(6, 'Username must be at least 6-character long')
    .max(20, 'Username cannot exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscore')
    .required(),
  email: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .email('Please provide a valid email address')
    .required(),
  password: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-zA-Z]/, 'Password must include letters')
    .matches(/\d/, 'Password must include numbers')
    .matches(/[!@#$%^&*]/, 'Password must include special characters')
    .required(),
});

export const loginSchema = Yup.object({
  login: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required(),
  password: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required(),
});

export const initiatePasswordResetSchema = Yup.object({
  email: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .email('Please provide a valid email address')
    .required(),
});

export const resetPasswordFormSchema = Yup.object({
  newPassword: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(6, 'New password must be at least 6-character long')
    .matches(/[a-zA-Z]/, 'New password must include letters')
    .matches(/\d/, 'New password must include numbers')
    .matches(/[!@#$%^&*]/, 'New password must include special characters')
    .required(),
});

export const resetPasswordAPISchema = Yup.object({
  resetPasswordToken: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .matches(/^[0-9a-fA-F]+$/, 'Reset token must be a valid hex string')
    .length(64, 'Reset token must be exactly 64-character long')
    .required(),
  newPassword: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(6, 'New password must be at least 6-character long')
    .matches(/[a-zA-Z]/, 'New password must include letters')
    .matches(/\d/, 'New password must include numbers')
    .matches(/[!@#$%^&*]/, 'New password must include special characters')
    .required(),
});

export type RegisterDTO = Yup.InferType<typeof registerSchema>;

export type LoginDTO = Yup.InferType<typeof loginSchema>;

export type InitiatePasswordResetDTO = Yup.InferType<typeof initiatePasswordResetSchema>;

export type ResetPasswordFormDTO = Yup.InferType<typeof resetPasswordFormSchema>;

export type ResetPasswordAPIDTO = Yup.InferType<typeof resetPasswordAPISchema>;
