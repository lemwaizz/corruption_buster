import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface UserDto {
  id: string;
}

export interface CurrentUser extends UserDto {}

const getCurrentUserByContext = (context: ExecutionContext): CurrentUser => {
  return context.switchToHttp().getRequest().user;
};

export const GetCurrentUserDetails = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
