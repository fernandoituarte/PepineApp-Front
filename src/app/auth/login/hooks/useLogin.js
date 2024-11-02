import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { resetAuthState, loginUser } from "@/store/reducer/auth/auth";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Custom hook to handle user login functionality
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, loading, error } = useAppSelector((state) => state.auth);

  // Setup form handling for login
  const { register, handleSubmit } = useForm();

  // Function to handle form submission and dispatch login action
  const onSubmit = handleSubmit((data) => {
    dispatch(loginUser(data));
  });

  // Effect to handle login status changes and redirect or show error feedback
  useEffect(() => {
    if (status === 201) {
      router.replace("/");
    }
    if (status === 401) {
      setTimeout(() => {
        dispatch(resetAuthState());
      }, 5000);
    }
  }, [status, router, dispatch, error]);

  return { register, onSubmit, loading, error };
};
