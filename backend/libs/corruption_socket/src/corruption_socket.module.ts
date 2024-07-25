import { Global, Module } from '@nestjs/common';
import { CorruptionSocketGateway } from './corruption_socket.gateway';

@Global()
@Module({
  providers: [CorruptionSocketGateway],
  exports: [CorruptionSocketGateway],
})
export class CorruptionSocketGatewayModule {}
