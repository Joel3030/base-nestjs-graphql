import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field(() => [String])
  roles: Array<string>;
}
