import { Body, Controller, Get, Post } from '@nestjs/common';
import { StackService } from '../services/stack.service';
import { Stack } from '../entities/stack.entity';
import { CreateStackDto } from '../dto/createStack.dto';

@Controller('')
export class StackController {
  constructor(private readonly stackService: StackService) {}
  @Post()
  async create(@Body() body: CreateStackDto): Promise<Stack> {
    return await this.stackService.createStackRecord({ body });
  }

  @Get()
  async findAll(): Promise<Stack[]> {
    return await this.stackService.getAllStackRecords();
  }
}
