import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './create-user-dto';
import { AuthGuard } from '../guards/auth/auth.guard';


@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUser: {email: string, password: string}) {
    return this.authenticationService.login(loginUser);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: string) {
    return this.authenticationService.getProfile(userId);
  }

}
