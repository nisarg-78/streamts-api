const crypto = require("crypto")
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CredentialsService {
  serverCFCookies: object | null = null;
  day = 60 * 60 * 24;
  constructor(private configService: ConfigService) {}

  setCFCookies(res: Response) {
    const cookies = this.generateCFCookies();
    cookies.forEach((cookie) => {
      res.cookie(cookie[0], cookie[1], cookie[2]);
    });
  }

  generateCFCookies(seconds: number = this.day) {
    const privateKey = this.configService.get('CLOUDFRONT_PRIVATE_KEY');
    const keyPairID = this.configService.get('CLOUDFRONT_KEY_PAIR_ID');
    const domain = this.configService.get('DOMAIN');
    const cdn = this.configService.get('CDN');
    const expires = Math.floor(Date.now() / 1000) + seconds;

    const policy = {
      Statement: [
        {
          Resource: `${cdn}/*`,
          Condition: {
            DateLessThan: {
              'AWS:EpochTime': expires,
            },
          },
        },
      ],
    };
    const policyString = JSON.stringify(policy);
    const policyBase64 = Buffer.from(policyString).toString('base64');
    const policyStatementNoSpace = policyString.replace(/\s/g, '');
    const sign = crypto.createSign('SHA1');
    sign.update(policyStatementNoSpace);
    const signature = sign.sign(privateKey, 'base64');
    const base64EncodedString = Buffer.from(signature, 'base64').toString(
      'base64',
    );
    const urlSafeString = base64EncodedString
      .replace(/\+/g, '-')
      .replace(/\//g, '~')
      .replace(/=/g, '_');

    const cookies = [
      [
        'CloudFront-Policy',
        policyBase64,
        {
          domain: domain,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        },
      ],
      [
        'CloudFront-Signature',
        urlSafeString,
        {
          domain: domain,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        },
      ],
      [
        'CloudFront-Key-Pair-Id',
        keyPairID,
        {
          domain: domain,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        },
      ],
    ];

    return cookies;
  }

  getCFCookieForServer() {
    if (this.serverCFCookies) return this.serverCFCookies;
    const expiry = this.day * 30;
    const cookie = this.generateCFCookies(expiry);
    this.serverCFCookies = cookie;
    setTimeout(() => {
      this.serverCFCookies = null;
    }, expiry);
    return cookie;
  }
}
