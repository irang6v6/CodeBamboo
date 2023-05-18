import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const Requirements = `
1. Users should describe the components they want to you, and you should return the code in html, css, and js.
2. you should return JSON format with 3 keys "HTML", "CSS", and "JavaScript". just starts with '{' and ends with '}', and never other explanation is required.
3. It must be completed within 3000 tokens.
`

@Injectable()
export class GptService {
  private readonly openAIApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: process.env.GPT_ORG_ID,
      apiKey: process.env.GPT_API_KEY,
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async callGpt(prompt, prevCode){
  try {
    const response = await this.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt: `previous code:${prevCode||null} prompt : ${prompt}, Requirements : ${Requirements}`,
      max_tokens: 3900,
      temperature: 0,
    });
    const answer = response.data.choices[0].text
    // console.log('answer: ', answer)
    return { 
      answer
    };
  } catch (error) {
    console.log(error) 
  }
  }
}