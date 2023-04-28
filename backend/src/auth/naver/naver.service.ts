import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverService {
  async oauth(code: string): Promise<any> {
    // Your implementation for Kakao
  }
}