import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class UbuntuTemplate implements QuickTemplate {
  id = 'ubuntu' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'Ubuntu',
      description: 'A minimal Ubuntu container kept running (good for SSH-ing into it later).',
      image: 'ubuntu:24.04',
      dockerRun: 'docker run -d --name vps-ubuntu ubuntu:24.04 sleep infinity',
      notes: [
        'Exec shell: docker exec -it vps-ubuntu bash',
        'If you need packages: docker exec -it vps-ubuntu bash -lc "apt update && apt install -y curl git"'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'ubuntu:24.04',
        name: 'vps-ubuntu',
        command: ['sleep', 'infinity']
      },
      overrides
    )
  }
}


