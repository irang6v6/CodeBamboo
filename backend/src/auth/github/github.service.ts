import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  async oauth(code: string): Promise<any> {
    // Your implementation for Kakao
  }
}