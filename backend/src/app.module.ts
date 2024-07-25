import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from '@app/auth';
import { OpenaiModule } from './openai/openai.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { CorruptionSocketGatewayModule } from '@app/corruption_socket/index';
import { SocketClientGateway } from './socket-client/socket-client.gateway';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OpenaiModule,
    CorruptionSocketGatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // postgres
        DATABASE_URL: Joi.string().required(),
        OPENAI_API_KEY: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketClientGateway],
})
export class AppModule {}
