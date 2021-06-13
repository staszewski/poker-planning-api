class UserRo {
  id: string;
  email: string;
  created: Date;
  token?: string;
  constructor(id?: string, email?: string, created?: Date) {
    this.id = id || '';
    this.email = email || '';
    this.created = created || new Date();
  }
}

export default UserRo;
