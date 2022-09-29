import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength, IsArray } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'the username is too short' })
  @MaxLength(25, { message: 'the username is too long' })
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'the password is too short' })
  password: string;

  @IsNotEmpty()
  @IsArray()
  roles: string[];
}
