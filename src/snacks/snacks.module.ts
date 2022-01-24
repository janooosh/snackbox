import { Module } from '@nestjs/common';
import { SnacksController } from './snacks/snacks.controller';
import { SnacksService } from './snacks/snacks.service';

@Module({
    

  controllers: [SnacksController],
  providers: [SnacksService],
})
export class SnacksModule {}
