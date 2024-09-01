import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { PhoneLoginDialogProps, PhoneLoginFormData } from "../../types/login";
import { useState } from "react";
import { verifyOtp } from "../../services/authService"; 
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

function PhoneLoginDialog({ open, onClose }: PhoneLoginDialogProps) {
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<PhoneLoginFormData>();
  const [isOtpStep, setOtpStep] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const navigate = useNavigate();
  
  const onSubmitPhone: SubmitHandler<PhoneLoginFormData> = (data) => {
    if (data.phoneNumber.length < 10) {
      setError("phoneNumber", { type: "manual", message: "Nomor HP harus minimal 10 digit." });
      return;
    }
    setPhoneNumber(data.phoneNumber); 
    setOtpStep(true);
    reset();
  };

  const onSubmitOtp: SubmitHandler<PhoneLoginFormData> = async (data) => {
    if (data.otp.length !== 6) {
      setError("otp", { type: "manual", message: "Kode OTP harus 6 digit." });
      return;
    }
    
    try {
      const response = await verifyOtp(phoneNumber, data.otp);
      setAuthenticated(true);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        id: response.data.id,
        username: response.data.username,
        phoneNumber: response.data.phoneNumber
      }));
      onClose(); 
      navigate("/")
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError("otp", { type: "manual", message: "Verifikasi OTP gagal, periksa kembali kode OTP Anda." });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isOtpStep ? "Masukkan Kode OTP" : "Masukkan Nomor HP"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isOtpStep
            ? "Kami telah mengirimkan kode OTP ke nomor HP kamu. Masukkan kode tersebut untuk melanjutkan."
            : "Silakan masukkan nomor HP kamu untuk login."}
        </DialogContentText>

        {!isOtpStep ? (
          <form onSubmit={handleSubmit(onSubmitPhone)}>
            <TextField
              autoFocus
              margin="dense"
              label="Nomor HP"
              type="number"
              fullWidth
              variant="outlined"
              {...register("phoneNumber", { required: "Nomor HP wajib diisi" })}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
            />
            <DialogActions>
              <Button onClick={onClose}>Batal</Button>
              <Button type="submit">Kirim</Button>
            </DialogActions>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmitOtp)}>
            <TextField
              autoFocus
              margin="dense"
              label="Kode OTP"
              type="number"
              fullWidth
              variant="outlined"
              {...register("otp", { required: "Kode OTP wajib diisi" })}
              error={Boolean(errors.otp)}
              helperText={errors.otp?.message}
            />
            <DialogActions>
              <Button onClick={onClose}>Batal</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PhoneLoginDialog;
