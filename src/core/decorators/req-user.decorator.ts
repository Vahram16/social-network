import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { SessionJwtPayload } from '../type/session';

export const ReqUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest<Request>();
    return request.user as SessionJwtPayload;
  },
);
