import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { KanbanColumnService } from 'src/kanban-column/kanban-column.service';
import { Repository } from 'typeorm';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';
import { Kanban } from './entities/kanban.entity';

@Injectable()
export class KanbanService {
  constructor(
    @InjectRepository(Kanban)
    private kanbanRepo: Repository<Kanban>,
    private fileService: FileService,
    @Inject(forwardRef(() => KanbanColumnService))
    private kanbanColumnService: KanbanColumnService,
  ) {}

  async create(createKanbanDto: CreateKanbanDto, avatar: Express.Multer.File) {
    const avatarPath = avatar
      ? await this.fileService.createFile(avatar)
      : undefined;

    const kanban = this.kanbanRepo.create({
      ...createKanbanDto,
      avatar: avatarPath,
    });

    const createdKanban = await this.kanbanRepo.save(kanban);

    await this.kanbanColumnService.create(
      [
        {
          kanbanId: createdKanban.id,
          name: 'В ожидании',
          isInitial: true,
          order: 1,
        },
        {
          kanbanId: createdKanban.id,
          name: 'В работе',
          order: 2,
        },
        {
          kanbanId: createdKanban.id,
          name: 'В завершении',
          order: 3,
        },
      ],
      createdKanban,
    );

    return this.findOne(createdKanban.id);
  }

  findAll() {
    return this.kanbanRepo.find({ relations: { parentTask: true } });
  }

  async findOne(id: string) {
    try {
      const kanban = await this.kanbanRepo.findOne({
        where: { id },
        relations: { columns: { tasks: true }, parentTask: true },
      });

      if (!kanban) {
        throw new HttpException('Канбан не найден', HttpStatus.NOT_FOUND);
      }

      kanban.columns = kanban.columns.sort((c1, c2) => c1.order - c2.order);

      return kanban;
    } catch (e) {
      throw new HttpException('Канбан не найден', HttpStatus.NOT_FOUND);
    }
  }

  update(id: string, updateKanbanDto: UpdateKanbanDto) {
    return this.kanbanRepo.update(id, updateKanbanDto);
  }

  remove(id: string) {
    return this.kanbanRepo.delete(id);
  }
}
