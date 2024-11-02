import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/validations/schemas";
import { updatePassword, resetAuthState } from "@/store/reducer/auth/auth";

// Custom hook for handling user password update logic

export const useUpdateUserPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { status, loading, error } = useAppSelector((state) => state.auth);

  // Local states for controlling UI feedback and password visibility
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAdmin = pathname.includes("admin");

  // Form setup with validation schema for handling password change
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePassword) });

  // Handles form submission, dispatching the password update action
  const onSubmit = handleSubmit((data) => {
    const passwordData = {
      password: data.oldPassword,
      newPassword: data.password,
    };
    dispatch(updatePassword(passwordData));
  });

  // Effect to handle status changes for success or failure of the password update
  useEffect(() => {
    if (status === "password updated") {
      setShowMessage(true);
      setTimeout(() => {
        dispatch(resetAuthState());
        setShowMessage(false);
        router.replace(isAdmin ? "/admin" : "/user");
      }, 3000);
    }
    if (status === "password failed to update") {
      setErrorMessage(error);
      setTimeout(() => {
        dispatch(resetAuthState());
        setErrorMessage(null);
      }, 3000);
    }
  }, [status, router, dispatch, error, isAdmin]);

  // Return values and handlers for use in the component
  return {
    onSubmit,
    showMessage,
    errorMessage,
    register,
    errors,
    showPassword,
    setShowPassword,
    router,
    loading,
  };
};
