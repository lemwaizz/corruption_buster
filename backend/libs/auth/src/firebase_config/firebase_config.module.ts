import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { credential } from './firebase_credentials';

@Global()
@Module({})
export class FirebaseConfigModule {
  static forRoot(): any {
    const firebaseAdmin = admin.initializeApp({
      credential: credential,
    });

    return {
      module: FirebaseConfigModule,
      providers: [
        {
          provide: admin.app,
          useValue: firebaseAdmin,
        },
      ],
      exports: [admin.app],
    };
  }
}
