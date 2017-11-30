export class User {
  email: string = '';
  password: string = '';
  displayName:string = '';
  emailVerified:boolean = false;
  isAnonymous:boolean = false;
  photoURL: string = '';
  providerData: object = {};
  refreshToken: string = '';
  uid: string = '';
}
