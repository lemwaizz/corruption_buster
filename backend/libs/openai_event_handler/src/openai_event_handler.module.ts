import { Module } from '@nestjs/common';
import { OpenAiEventEventHandlerService } from './openai_event_handler.service';
import { OpenAiClient } from './open_ai_client';

@Module({
  imports: [],
  providers: [OpenAiEventEventHandlerService, OpenAiClient],
  exports: [OpenAiEventEventHandlerService, OpenAiClient],
})
export class OpenAiEventEventHandlerModule {}
