import { UserResponseDto } from '../../presentation/http/routes/users/dto/response/UserResponseDto';

export class User {
  readonly id: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly username: string;

  readonly email: string;

  readonly password: string;

  readonly created: Date;

  constructor(_id: string, firstName: string, lastName: string, username: string, email: string, password: string, created: Date) {
    this.id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created = created;
  }

  toUserResponse(): UserResponseDto {
    return new UserResponseDto(this.id, this.firstName, this.lastName, this.username, this.email, this.created);
  }
}
