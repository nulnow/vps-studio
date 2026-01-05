import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class LaravelTemplate implements QuickTemplate {
  id = 'laravel' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'Laravel',
      description: 'A Laravel-ready PHP image (Bitnami) exposing HTTP on 8000.',
      image: 'bitnami/laravel:latest',
      dockerRun:
        'docker run -d --name vps-laravel -p 8000:8000 bitnami/laravel:latest',
      notes: [
        'This is a starter container; you will likely mount your project later.',
        'Example: docker exec -it vps-laravel bash'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'bitnami/laravel:latest',
        name: 'vps-laravel',
        ports: ['8000:8000']
      },
      overrides
    )
  }
}


