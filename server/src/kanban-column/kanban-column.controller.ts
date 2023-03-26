import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { KanbanColumnService } from './kanban-column.service';
import { CreateKanbanColumnDto } from './dto/create-kanban-column.dto';
import { UpdateKanbanColumnDto } from './dto/update-kanban-column.dto';

@Controller('kanban-column')
export class KanbanColumnController {
  constructor(private readonly kanbanColumnService: KanbanColumnService) {}

  @Post()
  async create(
    @Body()
    createKanbanColumnDto: CreateKanbanColumnDto | CreateKanbanColumnDto[],
  ) {
    if (Array.isArray(createKanbanColumnDto)) {
      return await this.kanbanColumnService.create(createKanbanColumnDto);
    }

    const createdColumn = await this.kanbanColumnService.create([
      createKanbanColumnDto,
    ]);
    return createdColumn[0];
  }

  @Get()
  findAll() {
    return this.kanbanColumnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kanbanColumnService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKanbanColumnDto: UpdateKanbanColumnDto,
  ) {
    return this.kanbanColumnService.update(id, updateKanbanColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kanbanColumnService.remove(+id);
  }
}
