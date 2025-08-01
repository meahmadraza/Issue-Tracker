import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required").max(65500)
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).optional(),
    description: z.string().min(1, "Description is required").max(65500).optional(),
    assignedToUserId: z.string().min(1, "AssignedToUserId is required").max(255).optional().nullable()
});
