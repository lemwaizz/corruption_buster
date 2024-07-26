import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { HandleMessageDto } from './dto';
import { FirebaseAuthGuard } from '@app/guards';
import { CurrentUser, GetCurrentUserDetails } from '@app/decorators';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openAiService: OpenaiService) {}

  @Post()
  // @UseGuards(FirebaseAuthGuard)
  handleMessage(
    @Body() handleMessageDto: HandleMessageDto,
    @GetCurrentUserDetails() currentUser: CurrentUser,
  ) {
    return this.openAiService.handleMessage(
      handleMessageDto.threadId,
      handleMessageDto.message,
      currentUser.id,
    );
  }

  @Post('thread')
  // @UseGuards(FirebaseAuthGuard)
  createThread() {
    return this.openAiService.createThread();
  }
}

//thread_66B6skWk4HNaOHg56gvijnFF
