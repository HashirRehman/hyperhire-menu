import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/primsa.service';

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  getHello(): string {
    return 'Hello World!';
  }

  async getAllUsers() {
    const users = await this.prisma.test.findMany();
    return  users;
  }
}
