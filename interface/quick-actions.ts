import { z } from 'zod'

export const QuickActionIdSchema = z.enum([
  'ubuntu',
  'postgres',
  'minecraft',
  'laravel',
  'spring',
  'react',
  'function'
])

export type QuickActionId = z.infer<typeof QuickActionIdSchema>

export const QuickActionRunRequestSchema = z.object({
  id: QuickActionIdSchema
})

export type QuickActionRunRequest = z.infer<typeof QuickActionRunRequestSchema>

export const QuickActionRunResponseSchema = z.object({
  ok: z.boolean(),
  id: QuickActionIdSchema,
  containerId: z.string().min(1).optional(),
  error: z.string().min(1).optional()
})

export type QuickActionRunResponse = z.infer<typeof QuickActionRunResponseSchema>


