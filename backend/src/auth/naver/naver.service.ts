import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { SocialUserInfoDto } from '../dto/social.userInfo.dto';

@Injectable()
export class NaverService {

  async oauthNaver(provider: string, code: string): Promise<SocialUserInfoDto> {
    const client_id = process.env.NAVER_CLIENT_ID
    const client_secret = process.env.NAVER_CLIENT_SECRET
    const redirect_uri = process.env.REDIRECT_URI + '/' + provider
    const state = process.env.NAVER_STATE_TOKEN
    try {
      const response = await axios.get('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
      + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirect_uri + '&code=' + code + '&state=' + state, {
        headers:{
          'X-Naver-Client-Id':client_id, 
          'X-Naver-Client-Secret': client_secret
        }
      })
      if (response.status!==200) throw new UnauthorizedException()
      // console.log('data :', response.data)
      const access_token = response.data.access_token
      const header = "Bearer " + access_token
      const responseUserInfo = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          'Authorization': header
        }
      })
      if (responseUserInfo.status!==200) throw new UnauthorizedException()
      // console.log('userInfo :', responseUserInfo.data)
      return responseUserInfo.data
    } catch (error) {
      console.log(error) 
      throw new UnauthorizedException()
    }
  }
}