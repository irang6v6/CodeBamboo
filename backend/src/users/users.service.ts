import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import axios from 'axios';
import * as qs from 'qs'

@Injectable()
export class UsersService {
  private users:User[] = [
    {
      "id":1,
      "name":"seoyong",
      "age":28,
      "position":"FrontEnd",
      "skills":["react","redux"]
    }
  ]

  getAll():User[] {
    return this.users
  }

  getOne(id:string):User {
    return this.users.find(user=>user.id === +id)
  }

  async oauth(owner: string, code: string ): Promise<any> {
    const kakaoKey = 'c29ede11d38b98d260d2a6007228d72e';
    const redirect_uri = `http://localhost:3000/oauth/${owner}`;
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const body = {
      grant_type: 'authorization_code',
      client_id: kakaoKey,
      redirect_uri,
      code,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios({
        method: 'POST',
        url: kakaoTokenUrl,
        timeout: 30000,
        headers,
        data: qs.stringify(body),
      });
      if (response.status === 200) {
        console.log(`kakaoToken : ${JSON.stringify(response.data)}`);
        // Token 을 가져왔을 경우 사용자 정보 조회
        const headerUserInfo = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer ' + response.data.access_token,
        };
        console.log(`url : ${kakaoTokenUrl}`);
        console.log(`headers : ${JSON.stringify(headerUserInfo)}`);
        const responseUserInfo = await axios({
          method: 'GET',
          url: kakaoUserInfoUrl,
          timeout: 30000,
          headers: headerUserInfo,
        });
        console.log(`responseUserInfo.status : ${responseUserInfo.status}`);
        if (responseUserInfo.status === 200) {
          console.log(
            `kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`,
          );
          return responseUserInfo.data;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }


  

  deleteOne(id:string) {
    this.users = this.users.filter(user=> user.id !== +id)
    return "Delete Success"
  }
}
