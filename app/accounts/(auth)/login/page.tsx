"use client";

import Form from "@/components/accounts/SignInForm";
import { Input, Button } from "@/components/accounts/SignInForm";
import { useActionState, useState } from "react";
import { authenticate } from "@/lib/auth/actions";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const isValueInvalid = !handle.trim() || !password.trim();

  return (
    <Form action={formAction} mode="login">
      <Input
        type="text"
        placeholder="사용자 아이디"
        name="handle"
        onChange={(e) => setHandle(e.target.value)}
        value={handle}
        error={undefined}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={undefined}
      />
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button disabled={isPending || isValueInvalid}>로그인</Button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </Form>
  );
}
