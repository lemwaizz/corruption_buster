import { Injectable, Logger, Scope } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiClient } from './open_ai_client';
import { AssistantStream } from 'openai/lib/AssistantStream';
import { CorruptionSocketGateway } from '@app/corruption_socket/corruption_socket.gateway';

@Injectable({ scope: Scope.REQUEST })
export class OpenAiEventEventHandlerService {
  private readonly _logger = new Logger(OpenAiEventEventHandlerService.name);
  client: OpenAI;
  private currentStream: AssistantStream;
  private assistantId = 'asst_nr6gcaMU6jWqhHI1xnaE2lRu';
  public currentUserId: string;

  constructor(
    private readonly openAiClient: OpenAiClient,
    private readonly corruptionSocket: CorruptionSocketGateway,
  ) {
    this.client = this.openAiClient.getClient();
  }

  setCurrentContext(userId: string) {
    this.currentUserId = userId;
  }

  private observeStream(stream: AssistantStream) {
    this.currentStream = stream
      .on('textDelta', (e) => {
        console.log('Text DELTA😁😁', e.value);
        this.corruptionSocket.sendUserDeltaMessage(
          this.currentUserId,
          e.value ?? '',
        );
      })
      .on('textDone', (e) => {
        console.log('TEXT DONE🚀🚀', e.value);
      })
      .on('end', () => {
        console.log('🔚🔚 End');
      });
    return stream.finalMessages();
  }

  async addMessage(threadId: string, text: string) {
    await this.client.beta.threads.messages.create(threadId, {
      role: 'user',
      content: text,
    });
    const stream = this.client.beta.threads.runs.stream(threadId, {
      assistant_id: this.assistantId,
    });
    return this.observeStream(stream);
  }

  async submitToolOutputs(
    runId: string,
    toolOutputs: OpenAI.Beta.Threads.RunSubmitToolOutputsParams.ToolOutput[],
  ) {
    const stream = this.client.beta.threads.runs.submitToolOutputsStream(
      'this.thread.id',
      runId,
      {
        tool_outputs: toolOutputs,
      },
    );
    return this.observeStream(stream);
  }
}
