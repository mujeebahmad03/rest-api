import { ResponseHelperService } from './response-helper.service';
import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';

@Global()
@Module({
  providers: [HelperService, ResponseHelperService],
  exports: [HelperService, ResponseHelperService],
})
export class HelperModule {}
