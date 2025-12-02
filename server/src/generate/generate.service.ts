import { Injectable } from '@nestjs/common';
import { UserGenerateRequest } from './request/user-generate.request';

@Injectable()
export class GenerateService {
  async userGenerate(requestBody: UserGenerateRequest): Promise<Response> {
    const requestUrl: URL = new URL('v1/user_generate', process.env.CORE_URL);
    const requestHeader: Headers = new Headers({
      'content-type': 'application/json; charset=utf-8'
    });
    const response: Response = await fetch(requestUrl.toString(), {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(requestBody)
    });

    return response;
  }
}
