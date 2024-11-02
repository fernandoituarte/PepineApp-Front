"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "@/validations/schemas";
import {
  updateUser,
  resetUserState,
  getUserById,
} from "@/store/reducer/user/user";

// Custom hook for updating user information

export const useUpdateUserInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get the user-related state and user session from Redux
  const { status, user, loading, error } = useAppSelector(
    (state) => state.user,
  );
  const { user: userSession } = useAppSelector((state) => state.auth);

  // Local states for showing messages
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Setting up form handling with validation schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userUpdateSchema) });

  // Fetch user data when the session is active
  useEffect(() => {
    if (userSession) {
      dispatch(getUserById(userSession.id));
    }
  }, [dispatch, userSession]);

  // Populate form fields with fetched user data
  useEffect(() => {
    if (user) {
      const { first_name, last_name, email, phone } = user;
      reset({
        first_name,
        last_name,
        email,
        phone,
      });
    }
  }, [user, reset]);

  // Handle form submission, dispatching update action with form data
  const onSubmit = handleSubmit((data) => {
    const userInfo = { ...data };
    dispatch(updateUser({ userInfo, id: userSession.id }));
  });

  // React to the update status, showing messages and handling navigation
  useEffect(() => {
    if (status === "user updated") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      setTimeout(() => {
        dispatch(resetUserState());
        router.back();
      }, 3000);
    }
    if (status === "user failed to update") {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [status, router, dispatch, error]);

  // Return values and handlers for use in a component
  return {
    onSubmit,
    errors,
    showMessage,
    errorMessage,
    register,
    user,
    loading,
  };
};
