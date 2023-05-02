import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { SocialUserInfoDto } from '../dto/social.userInfo.dto';

@Injectable()
export class GithubService {
  async oauthGithub(provider: string ,code: string): Promise<SocialUserInfoDto> {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret : process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri : process.env.REDIRECT_URI + '/' + provider
    }
    try {
      const response = await axios.post("https://github.com/login/oauth/access_token", body)
      if (response.status!==200) throw new UnauthorizedException()
      // console.log(response)
      const access_token = response.data.split('=')[1].split('&')[0]
      // console.log('token : ', access_token)
      const responseUserInfo = await axios.get("https://api.github.com/user", {
        headers: { 
          Authorization: `token ${access_token}` 
        }
      })
      if (responseUserInfo.status!==200) throw new UnauthorizedException()
      // console.log(responseUserInfo.data)
      return responseUserInfo.data
    } catch(error) {
      console.log(error)
      throw new UnauthorizedException()
    }
  }
}