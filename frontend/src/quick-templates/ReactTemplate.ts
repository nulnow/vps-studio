import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class ReactTemplate implements QuickTemplate {
  id = 'react' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'React',
      description: 'Ubuntu 24.04 container that bootstraps Node.js + a demo Vite React app.',
      image: 'ubuntu:24.04',
      dockerRun:
        'docker run -d --name vps-react -p 5173:5173 ubuntu:24.04 bash -lc "<bootstrap script>"',
      commands: [
        'docker logs -f <container>',
        'docker exec -it <container> bash'
      ],
      notes: [
        'Container name will get a tiny random suffix when created from Quick deploy (example: vps-react-a1b2).',
        'First start takes a few minutes (apt + node + npm install).',
        'Then open: http://localhost:5173'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'ubuntu:24.04',
        name: 'vps-react',
        ports: ['5173:5173'],
        command: ['bash', '-lc', 'sleep infinity']
      },
      overrides
    )
  }
}


