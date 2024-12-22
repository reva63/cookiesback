import { Module } from '@nestjs/common';
import { StackModule } from './stack/stack.module';

@Module({
  imports: [StackModule],
})
export class BusinessModule {}
