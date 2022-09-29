import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from 'src/user/dto/user-response';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
