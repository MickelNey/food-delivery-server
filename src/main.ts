import { NestFactory } from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5050
  const app = await NestFactory.create(AppModule)

  app.enableCors({

    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });
  const config = new DocumentBuilder()
    .setTitle('Lesson backend')
    .setDescription('Documentation Rest api')
    .setVersion('1.0.0')
    .addTag('Mikhailo')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
}

start()
