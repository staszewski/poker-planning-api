import { IsEmail, IsNotEmpty } from 'class-validator';

class UserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  constructor(email?: string, password?: string) {
    this.email = email || '';
    this.password = password || '';
  }
}

export default UserDTO;
