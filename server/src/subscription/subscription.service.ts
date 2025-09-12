import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './schemas/subscription.schema';
import { CreateSubscriptionRequest } from './request/create-subscription.request';

@Injectable()
export class SubscriptionService {
  constructor(@InjectModel(Subscription.name) private readonly subscriptionModel: Model<SubscriptionDocument>) { }

  async createSubscription(requestBody: CreateSubscriptionRequest): Promise<void> {
    const { email } = requestBody;
    const existing = await this.subscriptionModel.findOne({ email }).exec();
    if (existing) {
      return;
    }
    const created = new this.subscriptionModel(requestBody);
    await created.save();
  }
}
