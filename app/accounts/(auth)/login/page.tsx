"use client";

import Form from "@/components/accounts/SignInForm";
import { Input, Button } from "@/components/accounts/SignInForm";
import { useActionState } from "react";
import { authenticate } from "@/lib/auth/actions";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <Form action={formAction} mode="login">
      <Input type="text" placeholder="사용자 아이디" name="handle" />
      <Input type="password" placeholder="비밀번호" name="password" />
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button disabled={isPending}>로그인</Button>
      {errorMessage && <p>{errorMessage}</p>}
    </Form>
  );
}
