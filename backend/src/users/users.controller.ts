import { Query, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SimpleUserDto } from './dto/simple.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    ) {}

  @Get()
  getAll(): Promise<SimpleUserDto[]> {
    return this.usersService.getAll();
  }

  @Get('search')
  search(@Query('name') userInput: string): Promise<SimpleUserDto[]> {
    return this.usersService.search(userInput);
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<SimpleUserDto> {
    return this.usersService.getOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.usersService.deleteOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    this.usersService.update(id, updateUserDto);
  }
}
