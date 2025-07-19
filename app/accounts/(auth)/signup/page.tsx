"use client";

import Form from "@/components/accounts/SignInForm";
import { Input, Button } from "@/components/accounts/SignInForm";
import { useActionState, useState } from "react";
import { signUp } from "@/lib/auth/actions";
import type { State } from "@/lib/auth/actions";
import { useSearchParams } from "next/navigation";
import { FormSchema } from "@/lib/auth/schema";

export default function Page() {
  const initialState: State = { message: "", errors: {} };
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  const [handle, setHandle] = useState("");
  const [handleError, setHandleError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSchema = FormSchema.pick({ handle: true });
  const nameSchema = FormSchema.pick({ name: true });
  const passwordSchema = FormSchema.pick({ password: true });

  const isInputValid =
    handle && name && password && !handleError && !nameError && !passwordError;

  function onFieldBlur(field: "handle" | "name" | "password") {
    let result;
    switch (field) {
      case "handle":
        result = handleSchema.safeParse({ handle });
        if (!result.success) {
          setHandleError(result.error.flatten().fieldErrors.handle?.[0] || "");
        } else {
          setHandleError("");
        }
        break;
      case "name":
        result = nameSchema.safeParse({ name });
        if (!result.success) {
          setNameError(result.error.flatten().fieldErrors.name?.[0] || "");
        } else {
          setNameError("");
        }
        break;
      case "password":
        result = passwordSchema.safeParse({ password });
        if (!result.success) {
          setPasswordError(
            result.error.flatten().fieldErrors.password?.[0] || ""
          );
        } else {
          setPasswordError("");
        }
        break;
    }
  }

  return (
    <Form action={formAction} mode="signup">
      <Input
        type="text"
        placeholder="사용자 아이디"
        name="handle"
        error={handleError || state.errors?.handle?.[0]}
        onBlur={() => onFieldBlur("handle")}
        onFocus={() => setHandleError("")}
        onChange={(e) => setHandle(e.target.value)}
        value={handle}
      ></Input>
      <Input
        type="text"
        placeholder="사용자 이름"
        name="name"
        error={nameError || state.errors?.name?.[0]}
        onBlur={() => onFieldBlur("name")}
        onFocus={() => setNameError("")}
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></Input>
      <Input
        type="password"
        placeholder="비밀번호"
        name="password"
        error={passwordError || state.errors?.password?.[0]}
        onBlur={() => onFieldBlur("password")}
        onFocus={() => setPasswordError("")}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></Input>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button disabled={isPending || !isInputValid}>가입</Button>
      {state.message && <p className="text-red-500">{state.message}</p>}
    </Form>
  );
}
