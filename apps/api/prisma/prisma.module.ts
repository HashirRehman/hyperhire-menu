import { Module, Global } from '@nestjs/common';
import { PrismaService } from './primsa.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
