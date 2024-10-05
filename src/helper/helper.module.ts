import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTHelperService } from './jwt-helper.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [HelperService, JWTHelperService],
  exports: [HelperService, JWTHelperService],
})
export class HelperModule {}
