import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Profile } from "src/models/profiles/entities/profile.entity";

export const GetProfile = createParamDecorator((data, ctx: ExecutionContext): Profile => {
  const request = ctx.switchToHttp().getRequest();
  const { profile } = request.user;
  return profile;
})