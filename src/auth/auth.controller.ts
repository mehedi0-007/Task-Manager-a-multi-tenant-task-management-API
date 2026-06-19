import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('login') @HttpCode(HttpStatus.OK) login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
  @Post('refresh') @HttpCode(HttpStatus.OK) refresh(@Body() dto: RefreshDto) {
    return this.auth.refresh(dto.refreshToken);
  }
  @Post('logout') @HttpCode(HttpStatus.NO_CONTENT) logout(
    @Body() dto: RefreshDto,
  ) {
    return this.auth.logout(dto.refreshToken);
  }
}
