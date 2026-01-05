import type { DockerCreateContainerRequest } from '../../../interface/docker'
import { mergeCreateRequest, type QuickTemplate, type QuickTemplateInstructions } from './QuickTemplate'

export class SpringBootTemplate implements QuickTemplate {
  id = 'spring' as const

  instructions(): QuickTemplateInstructions {
    return {
      title: 'Spring Boot',
      description: 'Java runtime container (Temurin). Mount your JAR and run it.',
      image: 'eclipse-temurin:21-jre',
      dockerRun:
        'docker run -d --name vps-spring -p 8080:8080 eclipse-temurin:21-jre sleep infinity',
      notes: [
        'Put your jar into container and run: java -jar app.jar',
        'Example: docker cp ./app.jar vps-spring:/app.jar && docker exec -it vps-spring java -jar /app.jar'
      ]
    }
  }

  toCreateRequest(overrides?: Partial<DockerCreateContainerRequest>): DockerCreateContainerRequest {
    return mergeCreateRequest(
      {
        image: 'eclipse-temurin:21-jre',
        name: 'vps-spring',
        ports: ['8080:8080'],
        command: ['sleep', 'infinity']
      },
      overrides
    )
  }
}


