import { z } from 'zod'

export const SshAuthSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('password'),
    password: z.string().min(1)
  }),
  z.object({
    type: z.literal('key'),
    keyPath: z.string().min(1),
    passphrase: z.string().optional()
  })
])

export type SshAuth = z.infer<typeof SshAuthSchema>

export const ServerSetupRequestSchema = z.object({
  host: z.string().min(1),
  port: z.number().int().min(1).max(65535).default(22),
  username: z.string().min(1),
  auth: SshAuthSchema
})

export type ServerSetupRequest = z.infer<typeof ServerSetupRequestSchema>

export const OsInfoSchema = z.object({
  id: z.string().min(1),
  versionId: z.string().min(1),
  prettyName: z.string().optional()
})

export type OsInfo = z.infer<typeof OsInfoSchema>

export const SetupStepSchema = z.enum([
  'connect',
  'detect_os',
  'select_strategy',
  'apt_deps',
  'docker',
  'nvm',
  'node',
  'git',
  'clone',
  'npm_install',
  'pm2',
  'start'
])

export type SetupStep = z.infer<typeof SetupStepSchema>

export const SetupEventSchema = z.object({
  jobId: z.string().min(1),
  step: SetupStepSchema,
  status: z.enum(['start', 'success', 'error', 'info']),
  message: z.string().min(1),
  data: z.unknown().optional()
})

export type SetupEvent = z.infer<typeof SetupEventSchema>

export const SetupResultSchema = z.object({
  jobId: z.string().min(1),
  ok: z.boolean(),
  error: z.string().optional()
})

export type SetupResult = z.infer<typeof SetupResultSchema>


