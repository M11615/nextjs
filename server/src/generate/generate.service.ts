import { Injectable } from '@nestjs/common';
import { UserGenerateRequest } from './request/user-generate.request';

@Injectable()
export class GenerateService {
  async userGenerate(requestBody: UserGenerateRequest, signal: AbortSignal): Promise<Response> {
    const requestUrl: URL = new URL('v1/generate/user_generate', process.env.CORE_URL);
    const requestHeader: Headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    const response: Response = await fetch(requestUrl.toString(), {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(requestBody),
      signal
    });

    return response;
  }
}
