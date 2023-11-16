interface User {
  accesstoken: string;
  user: {
    role: number;
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}

export default User