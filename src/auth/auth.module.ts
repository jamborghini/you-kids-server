import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '10m' },
      }),
    })],
  providers: [AuthService, RolesGuard, JwtGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
