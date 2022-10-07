export class UserResponseDto {
  readonly id: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly username: string;

  readonly email: string;

  readonly created: Date;

  constructor(_id: string, firstName: string, lastName: string, username: string, email: string, created: Date) {
    this.id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.created = created;
  }
}
