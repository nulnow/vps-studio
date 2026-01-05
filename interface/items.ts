import { z } from 'zod'

export const VpsStudioItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  launchCommand: z.string().min(1),
  installedSoftware: z.array(
    z.object({
      name: z.string().min(1),
      version: z.string().min(1)
    })
  )
})

export type VpsStudioItem = z.infer<typeof VpsStudioItemSchema>

export const VpsStudioItemsResponseSchema = z.object({
  items: z.array(VpsStudioItemSchema)
})

export type VpsStudioItemsResponse = z.infer<typeof VpsStudioItemsResponseSchema>


