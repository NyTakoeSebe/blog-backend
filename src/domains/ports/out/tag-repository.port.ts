import { TagEntity } from '@/domains/entities';

interface CreateTagDto {
  title: string;
}

export interface TagRepositoryPort {
  loadTag(id: string): Promise<TagEntity>;
  create(dto: CreateTagDto);
}
