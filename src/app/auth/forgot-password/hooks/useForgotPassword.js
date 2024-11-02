import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { forgotPassword, resetAuthState } from "@/store/reducer/auth/auth";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/validations/schemas";

// Custom hook to handle forgot password functionality
export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { loading, status, error } = useAppSelector((state) => state.auth);

  // Local states for managing success and error messages
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // Setup form handling with schema validation for the forgot password form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Function to handle form submission and dispatch forgot password action
  const onSubmit = handleSubmit((data) => {
    dispatch(forgotPassword(data));
  });

  // Effect to handle status changes and show feedback messages
  useEffect(() => {
    if (status === 201) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        resetAuthState();
      }, 3000);
    }
    if (status === 404) {
      setErrorMessage(error);
      setTimeout(() => {
        resetAuthState();
        setErrorMessage("");
      }, 3000);
    }
  }, [status, error]);

  // Return form handlers, loading state, and messages for use in a component
  return {
    loading,
    register,
    errors,
    showMessage,
    errorMessage,
    onSubmit,
  };
};
