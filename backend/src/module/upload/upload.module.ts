import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { PrismaService } from 'src/common/prisma/init.prisma';

@Module({
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
