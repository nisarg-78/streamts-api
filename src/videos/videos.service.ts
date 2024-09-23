import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CredentialsService } from 'src/credentials/credentials.service';

@Injectable()
export class VideosService {
  constructor(
    private configService: ConfigService,
    private credentialsService: CredentialsService,
  ) {}

  async getMasterM3U8(id: string) {
    try {
      const cdn = this.configService.get('CDN');
      const cookies = this.credentialsService.generateCFCookies();
      const masterM3U8 = await fetch(`${cdn}/videos/${id}/master.m3u8`, {
        headers: {
          Cookie: cookies
            .map((cookie) => `${cookie[0]}=${cookie[1]}`)
            .join('; '),
        },
      });
      let masterM3U8Text = await masterM3U8.text();
      masterM3U8Text = masterM3U8Text.replace(/<<<url>>>/g, cdn);
      return masterM3U8Text;
    } catch (e) {
      console.log(e);
    }
  }
}
