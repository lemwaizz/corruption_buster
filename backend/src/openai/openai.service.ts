import {
  OpenAiClient,
  OpenAiEventEventHandlerService,
} from '@app/openai_event_handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenaiService {
  constructor(
    private readonly openAiClient: OpenAiClient,
    private readonly openApiEventHandlerService: OpenAiEventEventHandlerService,
  ) {}

  async handleMessage(threadId: string, message: string, userId: string) {
    const client = this.openAiClient.getClient();
    await client.beta.threads.messages.create(threadId, {
      role: 'user',
      content: `${message}`,
    });
    this.openApiEventHandlerService.setCurrentContext(userId);
    const messages = this.openApiEventHandlerService.addMessage(
      threadId,
      message,
    );
    console.log('MESSAGES💬💬', messages);
  }

  async createThread() {
    const client = this.openAiClient.getClient();
    const thread = await client.beta.threads.create();
    return { threadId: thread.id };
  }
}
