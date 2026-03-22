import { getRequest, patchRequest } from '../utils/axios/helper';
import type { User } from '../types';
import { USER_PROFILE, CHANGE_PASSWORD } from '../constants';
import {
  editProfileSchema,
  type EditProfileDTO,
  changePasswordSchema,
  type ChangePasswordDTO,
} from '../schemas';
import { validateSchema } from '../utils/helper';

export const getProfile = () => {
  return getRequest<User>(USER_PROFILE);
};

export const editProfile = async (dto: EditProfileDTO) => {
  const validatedDTO = await validateSchema(editProfileSchema, dto);
  return patchRequest<User>(USER_PROFILE, validatedDTO);
};

export const changePassword = async (dto: ChangePasswordDTO) => {
  const validatedDTO = await validateSchema(changePasswordSchema, dto);
  return patchRequest<void>(CHANGE_PASSWORD, validatedDTO);
};
