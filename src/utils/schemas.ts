import { z } from 'zod';

const validMediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm'];

export const MediaUrlSchema = z
  .string()
  .url('Media URL must be a valid URL')
  .refine((url) => validMediaExtensions.some((ext) => url.toLowerCase().endsWith(ext)), {
    message: 'Media URL must point to a supported file type',
  });
