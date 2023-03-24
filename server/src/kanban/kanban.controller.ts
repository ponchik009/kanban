import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { KanbanService } from './kanban.service';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createKanbanDto: CreateKanbanDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.kanbanService.create(createKanbanDto, avatar);
  }

  @Get()
  findAll() {
    return this.kanbanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kanbanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKanbanDto: UpdateKanbanDto) {
    return this.kanbanService.update(id, updateKanbanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kanbanService.remove(id);
  }
}
