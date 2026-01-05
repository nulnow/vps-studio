import { UbuntuTemplate } from './UbuntuTemplate'
import { PostgresTemplate } from './PostgresTemplate'
import { MinecraftServerTemplate } from './MinecraftServerTemplate'
import { LaravelTemplate } from './LaravelTemplate'
import { SpringBootTemplate } from './SpringBootTemplate'
import { ReactTemplate } from './ReactTemplate'
import { FunctionTemplate } from './FunctionTemplate'

export const quickTemplates = [
  new UbuntuTemplate(),
  new PostgresTemplate(),
  new MinecraftServerTemplate(),
  new LaravelTemplate(),
  new SpringBootTemplate(),
  new ReactTemplate(),
  new FunctionTemplate()
] as const

export type AnyQuickTemplate = (typeof quickTemplates)[number]


