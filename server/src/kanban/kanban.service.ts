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

    console.log(createdKanban);

    await this.kanbanColumnService.create(
      [
        {
          kanbanId: createdKanban.id,
          name: 'В ожидании',
          initial: true,
        },
        {
          kanbanId: createdKanban.id,
          name: 'В работе',
        },
        {
          kanbanId: createdKanban.id,
          name: 'В завершении',
        },
      ],
      createdKanban,
    );

    return this.findOne(createdKanban.id);
  }

  findAll() {
    return this.kanbanRepo.find();
  }

  async findOne(id: string) {
    try {
      const kanban = await this.kanbanRepo.findOne({
        where: { id },
        relations: { columns: { tasks: true } },
      });

      if (!kanban) {
        throw new HttpException('Канбан не найден', HttpStatus.NOT_FOUND);
      }

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
