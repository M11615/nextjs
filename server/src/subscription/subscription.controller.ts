import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionRequest } from './request/create-subscription.request';

@Controller({ path: 'subscription', version: '1' })
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post('create-subscription')
  async createSubscription(@Body() requestBody: CreateSubscriptionRequest): Promise<void> {
    await this.subscriptionService.createSubscription(requestBody);
  }
}
