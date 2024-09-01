export interface User {
    id: string;
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
  }
  
  export interface OtpVerificationResponse {
    success: boolean;
    message?: string;
    data: AuthenticatedUser
  }

  export interface AuthenticatedUser {
    id: string;
    email: string;
    username: string;
    phoneNumber: string;
  }