export interface LoginRequest {
  email: string;
  password: string;
  remenberMe: boolean;
}
export interface LoginResponse {
  access_token: string;
  user: UserLoginResponse;
}

export interface UserLoginResponse {
  uuid: string;
  email: string;
  fullname: string;
  profile: string;
  avatar: null;
}
