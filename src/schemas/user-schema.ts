import * as Yup from 'yup';

export const editProfileSchema = Yup.object({
  username: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(6, 'Username must be at least 6-character long')
    .max(20, 'Username cannot exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscore'),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required(),
  newPassword: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(6, 'New password must be at least 6-character long')
    .matches(/[a-z]/, 'New password must include at least a lowercase letter')
    .matches(/[A-Z]/, 'New password must include at least an uppercase letter')
    .matches(/[0-9]/, 'New password must include at least a number')
    .matches(/[^a-zA-Z0-9]/, 'New password must include at least a special character')
    .notOneOf([Yup.ref('currentPassword')], 'New password cannot be the same as current password')
    .required(),
  confirmPassword: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required(),
});

export type EditProfileDTO = Yup.InferType<typeof editProfileSchema>;

export type ChangePasswordDTO = Yup.InferType<typeof changePasswordSchema>;
