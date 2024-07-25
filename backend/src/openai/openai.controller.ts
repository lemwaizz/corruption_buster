import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { HandleMessageDto } from './dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openAiService: OpenaiService) {}

  @Post()
  handleMessage(@Body() handleMessageDto: HandleMessageDto) {
    return this.openAiService.handleMessage(
      handleMessageDto.threadId,
      handleMessageDto.message,
      '123456',
    );
  }

  @Post('thread')
  createThread() {
    return this.openAiService.createThread();
  }
}

//thread_66B6skWk4HNaOHg56gvijnFF
