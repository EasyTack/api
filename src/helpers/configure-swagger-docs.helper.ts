import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function configureSwaggerDocs(
    app: INestApplication,
) {
    const config = new DocumentBuilder()
        .setTitle('EasyTrack')
        .setDescription('Central de rastreio de encomendas')
        .setVersion('1.0')
        .addBearerAuth()
        .addSecurity('ApiKeyAuth', {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization'
        })
        .addSecurityRequirements('ApiKeyAuth')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
}
