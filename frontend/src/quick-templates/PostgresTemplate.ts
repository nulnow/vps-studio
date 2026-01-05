import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class PostgresTemplate implements QuickTemplate {
  id = 'postgres' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'Postgres',
      description: 'PostgreSQL 16 with a default database and password.',
      image: 'postgres:16',
      dockerRun:
        'docker run -d --name vps-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=app -p 5432:5432 postgres:16',
      notes: [
        'Connect: postgres://postgres:postgres@localhost:5432/app',
        'Data persists only while container exists (add a volume later if needed).'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'postgres:16',
        name: 'vps-postgres',
        env: {
          POSTGRES_PASSWORD: 'postgres',
          POSTGRES_USER: 'postgres',
          POSTGRES_DB: 'app'
        },
        ports: ['5432:5432']
      },
      overrides
    )
  }
}


