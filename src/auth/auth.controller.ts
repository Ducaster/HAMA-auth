// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  async googleLogin(@Body() userData) {
    return this.authService.googleLogin(userData);
  }

  @Post('register')
  async registerUser(@Body() body) {
    return await this.authService.registerUser(body.user, body.additionalInfo);
  }

  @Post('refresh')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    return this.authService.logout(req.user);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Req() req, @Body() updateData) {
    return this.authService.updateUser(req.user, updateData);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Req() req) {
    return this.authService.deleteUser(req.user);
  }
}
