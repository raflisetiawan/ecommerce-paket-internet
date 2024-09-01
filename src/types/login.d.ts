export interface PhoneLoginDialogProps {
    open: boolean;
    onClose: () => void;
  }
  
  export interface PhoneLoginFormData {
    phoneNumber: string;
    otp: string;
  }

  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface RegisterFormData {
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }
  
  