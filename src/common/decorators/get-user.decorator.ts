import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../../authentication/entities/auth.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request.user;
  return user;
})