import type { DockerCreateContainerRequest } from '../../../interface/docker'

export type QuickTemplateId =
  | 'ubuntu'
  | 'postgres'
  | 'minecraft'
  | 'laravel'
  | 'spring'
  | 'react'
  | 'function'

export type QuickTemplateInstructions = {
  /** Human-friendly title (not localized on purpose — UI can localize separately) */
  title: string
  /** Short description */
  description: string
  /** Docker image used */
  image: string
  /** One-liner users can paste into a terminal */
  dockerRun: string
  /** Optional list of commands users can paste into a terminal (host-side) */
  commands?: string[]
  /** Optional extra notes */
  notes?: string[]
}

export interface QuickTemplate {
  id: QuickTemplateId
  instructions(): QuickTemplateInstructions
  /**
   * Converts this template into a payload for the local backend:
   * POST /vps-studio/docker/containers
   */
  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest
}

export function mergeCreateRequest(
  base: DockerCreateContainerRequest,
  overrides?: Partial<DockerCreateContainerRequest>
): DockerCreateContainerRequest {
  if (!overrides) return base
  return {
    ...base,
    ...overrides,
    env: { ...(base.env ?? {}), ...(overrides.env ?? {}) },
    ports: overrides.ports ?? base.ports,
    command: overrides.command ?? base.command
  }
}


