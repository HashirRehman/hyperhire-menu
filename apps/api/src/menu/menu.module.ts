import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/primsa.service';
import { MenusService } from './menu.service';
import { MenusController } from './menu.controller';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  controllers: [MenusController],
  providers: [MenusService],
  imports: []
})
export class MenusModule {}
