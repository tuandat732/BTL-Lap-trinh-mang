import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {

  // app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('NFTIFY')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addServer(process.env.APP_URL)
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);
}
