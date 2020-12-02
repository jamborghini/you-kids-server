import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '10s' },
    }),
  })],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
}
