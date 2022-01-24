import { Module } from '@nestjs/common';
import { SnacksModule } from './snacks/snacks.module';

@Module({
  imports: [SnacksModule],
})
export class AppModule {}
