import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/primsa.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.menu.findMany({
      include: { children: true },
    });
  }

  async create(createMenuItemDto: CreateMenuDto) {
    const { name, parentId } = createMenuItemDto;

    if (parentId) {
      const parent = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        throw new Error('Parent menu item not found');
      }

      return await this.prisma.menu.create({
        data: {
          name,
          parentId,
        },
      });
    } else {
      return await this.prisma.menu.create({
        data: {
          name,
        },
      });
    }
  }
}
