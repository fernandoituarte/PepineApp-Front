import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { registerSchema } from "@/validations/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser, resetAuthState } from "@/store/reducer/auth/auth";

export const useRegister = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status, error } = useAppSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize form handling with react-hook-form and Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // Handler for form submission, dispatches registration action
  const onSubmit = handleSubmit((data) => {
    const userInfo = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(userInfo));
  });

  // Effect to handle user login after registration success
  useEffect(() => {
    if (status === 201) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.replace("/");
      }, 1000);
    } else if (status === 409) {
      setErrorMessage(
        "Un compte existe déjà avec cette adresse e-mail et/ou ce numéro de téléphone.",
      );
      setTimeout(() => {
        setErrorMessage("");
        dispatch(resetAuthState());
      }, 2000);
    } else if (status && error) {
      setErrorMessage(
        "Une erreur est survenue lors de la création de votre compte. Veuillez réessayer ultérieurement.",
      );
      setTimeout(() => {
        setErrorMessage("");
        dispatch(resetAuthState());
      }, 2000);
    }
  }, [status, dispatch, router, error]);

  return {
    onSubmit,
    register,
    success,
    errors,
    errorMessage,
  };
};
