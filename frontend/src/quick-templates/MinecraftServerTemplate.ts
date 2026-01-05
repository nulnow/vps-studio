import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class MinecraftServerTemplate implements QuickTemplate {
  id = 'minecraft' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'Minecraft server',
      description: 'A vanilla Minecraft server (itzg/minecraft-server).',
      image: 'itzg/minecraft-server:latest',
      dockerRun:
        'docker run -d --name vps-minecraft -e EULA=TRUE -p 25565:25565 itzg/minecraft-server:latest',
      notes: [
        'First start may take some time while it downloads server files.',
        'Add -e MEMORY=2G or -e VERSION=1.21.4 if you want.'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'itzg/minecraft-server:latest',
        name: 'vps-minecraft',
        env: {
          EULA: 'TRUE'
        },
        ports: ['25565:25565']
      },
      overrides
    )
  }
}


