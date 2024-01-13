"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import InputBox from "../components/ui/InputBox";

const SignUp = () => {
  const [errorSignup, setError] = useState<string | null>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (submitBtn.current) {
      submitBtn.current.disabled = true;
    }
    setError(null);

    try {
      const response = await fetch("/auth/sign-up", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        if (error.message) {
          setError(error.message);
        } else {
          setError(error);
        }
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (submitBtn.current) {
        submitBtn.current.disabled = false;
      }
    }
  };

  return (
    <main className="h-full flex">
      <div className="m-auto flex flex-col gap-10 w-[325px]">
        <div className="flex flex-col gap-[16px]">
          <div className="h-[50px] w-[50px] bg-white rounded-full m-auto"></div>
          <div className="text-center gap-2">
            <h1 className="text-2xl">Welcome to checkie</h1>
            <p className="text-sm text-[#7E7E7E]">Sign up to continue</p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <form action={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {errorSignup && (
                <div className="text-[#eb4034] -my-2">{errorSignup}</div>
              )}
              <InputBox
                value="email"
                type="email"
                formattedValue="Email"
                autoComplete="email"
              ></InputBox>
              <InputBox
                value="password"
                type="password"
                formattedValue="Password"
                autoComplete="new-password"
              ></InputBox>
              <InputBox
                value="password2"
                type="password"
                formattedValue="Confirm password"
                autoComplete=""
              ></InputBox>
            </div>
            <button
              ref={submitBtn}
              className="w-full px-4 py-2 text-center bg-white text-dark rounded-full hover:opacity-85 transition disabled:hover:opacity-70 disabled:opacity-70"
            >
              Sign up
            </button>
          </form>
          <div className="flex gap-1 m-auto">
            <p className="opacity-50">Already have an account?</p>
            <Link href="/signin" className="hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
