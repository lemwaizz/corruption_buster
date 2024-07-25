import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { CurrentUser, GetCurrentUserDetails } from '@app/decorators';
import { FirebaseAuthGuard } from '@app/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @GetCurrentUserDetails() currentUser: CurrentUser,
  ) {}

  @Get()
  getUser(@GetCurrentUserDetails() currentUser: CurrentUser) {}
}
