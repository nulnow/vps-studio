import { z } from 'zod'

export const VpsStudioSchema = z.object({
  live: z.boolean(),
  vpsStudioApiVersion: z
    .string()
    .regex(/^v([1-9]\d*)$/, 'Must be "v" + positive integer (v1, v2, v3, ...)'),
  dockerInstalled: z.boolean(),
  dockerVersion: z.string().min(1).nullable()
})

export type VpsStudio = z.infer<typeof VpsStudioSchema>


