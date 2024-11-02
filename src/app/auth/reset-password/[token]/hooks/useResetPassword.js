import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { resetPassword, resetAuthState } from "@/store/reducer/auth/auth";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/validations/schemas";

export const useResetPassword = (token) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, status, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle form submission
  const onSubmit = handleSubmit((data) => {
    dispatch(resetPassword({ token, password: data.password }));
  });

  // Effect to handle the outcome after a password reset attempt
  useEffect(() => {
    if (status === 200) {
      setShowMessage(true);
      setTimeout(() => {
        dispatch(resetAuthState());
        setShowMessage(false);
        router.replace("/auth/login");
      }, 2000);
    }
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  }, [status, router, dispatch, error]);

  return {
    loading,
    register,
    errors,
    showMessage,
    showErrorMessage,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
  };
};
