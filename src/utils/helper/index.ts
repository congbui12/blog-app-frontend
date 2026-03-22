import { format, parseISO, formatDistanceToNow, isEqual } from 'date-fns';
import { type Schema, ValidationError } from 'yup';
import type { ApiErrorResponse } from '../../types';

export const formatDate = (isoDate: string, formatString = 'MMMM dd, yyyy HH:mm:ss'): string => {
  return format(parseISO(isoDate), formatString);
};

export const getTimeDistance = (isoDate: string): string => {
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
};

export const isEdited = (createdAt: string, updatedAt: string): boolean => {
  return !isEqual(parseISO(createdAt), parseISO(updatedAt));
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export const validateSchema = async <T>(schema: Schema<T>, data: unknown) => {
  try {
    const validatedData = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return validatedData;
  } catch (error) {
    if (error instanceof ValidationError) {
      const apiError: ApiErrorResponse = {
        ok: false,
        message: error.inner?.[0]?.message ?? error.message,
      };
      throw apiError;
    }
    throw error;
  }
};
