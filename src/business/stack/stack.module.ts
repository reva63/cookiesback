import { Module } from '@nestjs/common';
import { StackService } from './services/stack.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stack } from './entities/stack.entity';
import { StackController } from './controllers/stack.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stack])],
  controllers: [StackController],
  providers: [StackService],
})
export class StackModule {}
