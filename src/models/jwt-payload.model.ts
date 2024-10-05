export class JWTPayload {
  userId: string;
  otp?: string;
  resendTime?: number;
  requestType: JWTRequestType;
  nextCallTimeKey?: number;
  calls?: number;
}
export enum JWTRequestType {
  Login = 'login',
}
export class JWTResponse extends JWTPayload {
  expiryTime: Date;
  intitiationTime: Date;
  data: string;
}
