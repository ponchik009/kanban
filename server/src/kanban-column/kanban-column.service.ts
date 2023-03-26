import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Kanban } from 'src/kanban/entities/kanban.entity';
import { KanbanService } from 'src/kanban/kanban.service';
import { CreateKanbanColumnDto } from './dto/create-kanban-column.dto';
import { UpdateKanbanColumnDto } from './dto/update-kanban-column.dto';
import { KanbanColumn } from './entities/kanban-column.entity';

@Injectable()
export class KanbanColumnService {
  constructor(
    @InjectRepository(KanbanColumn)
    private kanbanColumnRepo: Repository<KanbanColumn>,
    @Inject(forwardRef(() => KanbanService))
    private kanbanService: KanbanService,
  ) {}

  async create(
    createKanbanColumnDto: CreateKanbanColumnDto[],
    kanban?: Kanban,
  ) {
    if (!kanban) {
      const kanbanId = createKanbanColumnDto[0].kanbanId;

      let kanban = await this.kanbanService.findOne(kanbanId);

      const columns = this.kanbanColumnRepo.create(createKanbanColumnDto);
      return this.kanbanColumnRepo.save(
        columns.map((column) => ({ ...column, kanban })),
      );
    }

    return this.kanbanColumnRepo.save(
      createKanbanColumnDto.map((column) => ({ ...column, kanban })),
    );
  }

  findAll() {
    return this.kanbanColumnRepo.find();
  }

  async findOne(id: string) {
    try {
      const column = await this.kanbanColumnRepo.findOne({ where: { id } });

      if (!column) {
        throw new HttpException('Колонка не найдена', HttpStatus.NOT_FOUND);
      }

      return column;
    } catch (e) {
      throw new HttpException('Колонка не найдена', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateKanbanColumnDto: UpdateKanbanColumnDto) {
    const column = await this.findOne(id);

    const kanban = await this.kanbanService.findOne(column.kanban.id);

    if (
      updateKanbanColumnDto.order < 0 ||
      updateKanbanColumnDto.order >= kanban.columns.length
    ) {
      throw new HttpException(
        'Неверный порядок колонки',
        HttpStatus.BAD_REQUEST,
      );
    }
    const kanbanColumns = kanban.columns;
  }

  remove(id: number) {
    return `This action removes a #${id} kanbanColumn`;
  }
}
