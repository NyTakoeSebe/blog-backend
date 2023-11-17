import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  MaxFileSizeValidator,
  ParseFilePipe,
  Delete,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { fileStorage } from './storage';
import { CreateFileResponse, DeleteFileResponse } from './types';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: CreateFileResponse })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.create(file);
  }

  @Delete(':filename')
  @ApiOkResponse({ type: DeleteFileResponse })
  delete(@Query('filename') filename: string) {
    return this.filesService.delete(filename);
  }
}
