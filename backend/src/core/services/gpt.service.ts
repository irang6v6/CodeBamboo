import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const Requirements = `
1. Please simply express the provided prompt as close as possible using html, css, and javascript.
2. Answers should follow the following JSON format. {"HTML": "<HTML code in JSON>", "CSS": "<CSS code in JSON>", "JavaScript": "<JavaScript code in JSON>"}. Please keep this format and provide an answer
3. Line breaks should be marked with string "\n", not ';'.
4. never other strings are required.
5. whole process must be completed within 3000 tokens.
`;

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

  async callGpt(prompt, prevCode) {
    try {
      const response = await this.openAIApi.createCompletion({
        model: 'text-davinci-003',
        prompt: `prompt : ${prompt}, Requirements : ${Requirements}`,
        max_tokens: 3900,
        temperature: 0,
      });
      const answer = response.data.choices[0].text;

      // {} 내부 코드만 자르기
      const jsonPart = answer.substring(
        answer.indexOf('{'),
        answer.lastIndexOf('}') + 1,
      );
      return {
        answer: jsonPart,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
