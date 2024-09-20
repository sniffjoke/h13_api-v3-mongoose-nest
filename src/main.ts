import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors-ts";
import {SETTINGS} from "./infrastructure/settings/settings";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true
  });
  app.use(cors({
    // credentials: true,
  }))
  await app.listen(SETTINGS.PORT, () => console.log('DB connect'));
  // app.use(cookieParser())
}
bootstrap();
