import { z } from 'zod';
import { ProjectSchema } from './BaseSchema';

export type Project = z.infer<typeof ProjectSchema>;
