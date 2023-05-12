import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LeafRepository } from './dao/leafs.repository';
import { LeafsController } from './leafs.controller';
import { LeafsService } from './leafs.service';
import { CodeRepository } from './dao/codes.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [LeafsController],
  providers: [...LeafRepository, ...CodeRepository, LeafsService],
})
export class LeafsModule {}
