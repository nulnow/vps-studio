import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class FunctionTemplate implements QuickTemplate {
  id = 'function' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'Function',
      description: 'A tiny Node container (use it as a sandbox for scripts/functions).',
      image: 'node:22-alpine',
      dockerRun:
        'docker run -d --name vps-function node:22-alpine sleep infinity',
      notes: [
        'Exec: docker exec -it vps-function sh',
        'Run a one-off script: docker exec -it vps-function node -e "console.log(\'hello\')"'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'node:22-alpine',
        name: 'vps-function',
        command: ['sleep', 'infinity']
      },
      overrides
    )
  }
}


