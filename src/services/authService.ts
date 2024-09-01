import axios, { AxiosError } from 'axios';
import { API_URL } from '../config';
import { User, OtpVerificationResponse } from '../types/auth';

export const registerUser = async (email: string, username: string, phoneNumber: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      email,
      username,
      phoneNumber,
      password,
    });
     await axios.post(`${API_URL}/phoneLogins`, {
      phoneNumber,
      id: response.data.id,
      otp: 123456,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Gagal melakukan pendaftaran');
    } else {
      throw error;
    }
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    const users = response.data;

    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error('Pengguna tidak ditemukan');
    }

    if (user.password !== password) {
      throw new Error('Password salah');
    }

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Login gagal');
    } else {
      throw error;
    }
  }
};

export const verifyOtp = async (phoneNumber: string, otp: string): Promise<OtpVerificationResponse> => {
  try {
    const response = await axios.get(`${API_URL}/phoneLogins`);
    const phoneLogins = response.data;

    const loginEntry = phoneLogins.find(
      (entry: { phoneNumber: string; otp: string }) => 
        entry.phoneNumber === phoneNumber && entry.otp === otp
    );
    if (!loginEntry) {
      throw new Error('OTP tidak valid');
    }


    const fetchUsersResponse = await axios.get<User[]>(`${API_URL}/users`);
    const users = fetchUsersResponse.data;

    const user = users.find((u) => u.id === loginEntry.id);
   
    if (!user) {
      throw new Error('Pengguna tidak ditemukan');
    }
 
    return { success: true, message: 'OTP berhasil diverifikasi', data: user};
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Gagal melakukan verifikasi OTP');
    } else {
      throw error;
    }
  }
};
