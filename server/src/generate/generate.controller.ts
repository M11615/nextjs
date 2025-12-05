import { FastifyReply } from 'fastify';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { UserGenerateRequest } from './request/user-generate.request';

@Controller({ path: 'generate', version: '1' })
export class GenerateController {
  constructor(private readonly generateService: GenerateService) { }

  @Post('user-generate')
  async userGenerate(@Body() requestBody: UserGenerateRequest, @Res() reply: FastifyReply): Promise<void> {
    const controller: AbortController = new AbortController();
    reply.raw.on('close', (): void => {
      controller.abort();
    });
    const response: Response = await this.generateService.userGenerate(requestBody, controller.signal);
    reply.type('text/plain; charset=utf-8').send(response.body);
  }
}
