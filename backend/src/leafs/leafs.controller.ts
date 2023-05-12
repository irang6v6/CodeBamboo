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
  Req,
} from '@nestjs/common';
import { LeafsService } from './leafs.service';
import { CreateLeafDto } from './dto/create.leaf.dto';
import { SimpleLeafDto } from './dto/simple.leaf.dto';
import { UpdateLeafDto } from './dto/update.leaf.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

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
  create(@Body() createLeaf, @Req() req: Request) {
    const user_id = req.user['user_id'];
    return this.leafsService.create(createLeaf, user_id);
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
