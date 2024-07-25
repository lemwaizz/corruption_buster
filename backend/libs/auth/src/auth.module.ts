import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseConfigModule } from './firebase_config/firebase_config.module';
import { FirebaseAuthStrategy } from './firebase_auth_strategy';

@Global()
@Module({
  providers: [AuthService, FirebaseAuthStrategy],
  exports: [AuthService, FirebaseAuthStrategy],
  imports: [FirebaseConfigModule.forRoot()],
})
export class AuthModule {}
