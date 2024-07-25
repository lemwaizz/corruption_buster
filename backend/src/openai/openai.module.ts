import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { OpenAiEventEventHandlerModule } from '@app/openai_event_handler';

@Module({
  imports: [OpenAiEventEventHandlerModule],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
