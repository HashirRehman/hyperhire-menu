import { Controller, Get, Post, Body } from '@nestjs/common';
import { MenusService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Post()
  create(@Body() createMenuItemDto: CreateMenuDto) {
    return this.menusService.create(createMenuItemDto);
  }
}
