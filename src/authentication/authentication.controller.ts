import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './create-user-dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authenticationService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUser: {email: string, password: string}) {
    return await this.authenticationService.login(loginUser);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: string) {
    return this.authenticationService.getProfile(userId);
  }

  // ---------- COOKIES ----------
  //   @Post('register')
  // async register(@Body() createUserDto: CreateUserDto, 
  // @Res({passthrough: true}) res: Response) {
  //   const resultado = await this.authenticationService.register(createUserDto);
  //   this.setTokenCookie(res, resultado.access_token);
  //   return { message: 'usuario registrado exitosamente' };
  // }

  // @Post('login')
  // async login(
  //   @Body() loginUser: {email: string, password: string},
  //   @Res({ passthrough: true }) res: Response // 💡 Inyectamos la respuesta con passthrough
  // ) {
  //   const result = await this.authenticationService.login(loginUser);
  //   this.setTokenCookie(res, result.access_token);// Seteamos la cookie de forma segura
  //   return { message: 'Login exitoso' };
  // }

  // private setTokenCookie(res: Response, token: string) {
  //   res.cookie('access_token', token, {
  //     httpOnly: true, // contra ataques XSS
  //     sameSite: 'strict', // contra ataques CSRF. "lax" o "strict" dependiendo de tus necesidades
  //     secure: false, // solo se enviará a través de HTTPS. True en produccion
  //     maxAge: 1000 * 30, // Sincronizacion de 30s con la exp del JWT token
  //   });
  // }

}
