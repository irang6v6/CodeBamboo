import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LeafsService } from './leafs.service';
import { CreateLeafDto } from './dto/create.leaf.dto';
import { SimpleLeafDto } from './dto/simple.leaf.dto';
import { UpdateLeafDto } from './dto/update.leaf.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('leaf')
export class LeafsController {
  constructor(private readonly leafsService: LeafsService) {}

  // @Get()
  // getAll(): Promise<SimpleLeafDto[]> {
  //   return this.leafsService.getAll();
  // }

  @Get('search')
  search(@Query('input') userInput: string) {
    return this.leafsService.search(userInput);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.leafsService.getOne(id);
  }

  @Post()
  create(@Body() createLeaf) {
    this.leafsService.create(createLeaf);
  }
  // @Post()
  // create(@Body() createLeafDto: CreateLeafDto) {
  //   this.leafsService.create(createLeafDto);
  // }

  //   @Delete(':id')
  //   delete(@Param('id') id: number) {
  //     this.usersService.deleteOne(id);
  //   }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeafDto: UpdateLeafDto) {
    this.leafsService.update(id, updateLeafDto);
  }
}
