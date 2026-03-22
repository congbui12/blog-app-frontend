import {
  registerSchema,
  type RegisterDTO,
  loginSchema,
  type LoginDTO,
  initiatePasswordResetSchema,
  type InitiatePasswordResetDTO,
  resetPasswordAPISchema,
  type ResetPasswordAPIDTO,
} from '../schemas';
import { validateSchema } from '../utils/helper';
import type { User } from '../types';
import { postRequest } from '../utils/axios/helper';
import { REGISTER, LOGIN, LOGOUT, FORGOT_PASSWORD, RESET_PASSWORD } from '../constants';

export const register = async (dto: RegisterDTO) => {
  const validatedDTO = await validateSchema(registerSchema, dto);
  return postRequest<User>(REGISTER, validatedDTO);
};

export const login = async (dto: LoginDTO) => {
  const validatedDTO = await validateSchema(loginSchema, dto);
  return postRequest<User>(LOGIN, validatedDTO);
};

export const logout = async () => {
  return postRequest<void, void>(LOGOUT);
};

export const forgotPassword = async (dto: InitiatePasswordResetDTO) => {
  const validatedDTO = await validateSchema(initiatePasswordResetSchema, dto);
  return postRequest<void>(FORGOT_PASSWORD, validatedDTO);
};

export const resetPassword = async (dto: ResetPasswordAPIDTO) => {
  const validatedDTO = await validateSchema(resetPasswordAPISchema, dto);
  return postRequest<void>(RESET_PASSWORD, validatedDTO);
};
