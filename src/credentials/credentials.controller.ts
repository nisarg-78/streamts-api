import { Controller, Get, Res } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { Response } from 'express';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get('cookie')
  getCookie(@Res({ passthrough: true }) res: Response) {
    return this.credentialsService.setCFCookies(res);
  }
}
