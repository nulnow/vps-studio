import { z } from 'zod'

export const DockerRunningContainerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
  status: z.string().min(1),
  createdAt: z.string().min(1).optional(),
  runningFor: z.string().min(1).optional(),
  command: z.string().min(1).optional(),
  // docker may return empty string when no ports are published
  ports: z.string().optional()
})

export type DockerRunningContainer = z.infer<typeof DockerRunningContainerSchema>

export const DockerRunningContainersResponseSchema = z.object({
  ok: z.boolean(),
  containers: z.array(DockerRunningContainerSchema),
  error: z.string().min(1).optional()
})

export type DockerRunningContainersResponse = z.infer<
  typeof DockerRunningContainersResponseSchema
>

export const DockerCreateContainerRequestSchema = z.object({
  image: z.string().min(1),
  name: z.string().min(1).optional(),
  command: z.array(z.string().min(1)).optional(),
  env: z.record(z.string().min(1)).optional(),
  ports: z.array(z.string().min(1)).optional()
})

export type DockerCreateContainerRequest = z.infer<typeof DockerCreateContainerRequestSchema>

export const DockerCreateContainerResponseSchema = z.object({
  ok: z.boolean(),
  containerId: z.string().min(1).optional(),
  error: z.string().min(1).optional()
})

export type DockerCreateContainerResponse = z.infer<typeof DockerCreateContainerResponseSchema>

export const DockerRemoveContainerResponseSchema = z.object({
  ok: z.boolean(),
  removed: z.boolean(),
  error: z.string().min(1).optional()
})

export type DockerRemoveContainerResponse = z.infer<typeof DockerRemoveContainerResponseSchema>

export const DockerContainerActionSchema = z.enum(['start', 'stop'])

export const DockerContainerActionResponseSchema = z.object({
  ok: z.boolean(),
  id: z.string().min(1),
  action: DockerContainerActionSchema,
  error: z.string().min(1).optional()
})

export type DockerContainerActionResponse = z.infer<typeof DockerContainerActionResponseSchema>


