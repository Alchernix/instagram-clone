"use client";

import Form from "@/components/accounts/SignInForm";
import { Input, Button } from "@/components/accounts/SignInForm";
import { useActionState } from "react";
import { signUp } from "@/lib/auth/actions";
import type { State } from "@/lib/auth/actions";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const initialState: State = { message: null, errors: {} };
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  return (
    <Form action={formAction} mode="signup">
      <Input
        type="text"
        placeholder="사용자 아이디"
        name="handle"
        error={state.errors?.handle && state.errors.handle[0]}
      ></Input>
      <Input
        type="text"
        placeholder="사용자 이름"
        name="name"
        error={state.errors?.name && state.errors.name[0]}
      ></Input>
      <Input
        type="password"
        placeholder="비밀번호"
        name="password"
        error={state.errors?.password && state.errors.password[0]}
      ></Input>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button disabled={isPending}>가입</Button>
      {state.message && <p className="text-red-500">{state.message}</p>}
    </Form>
  );
}
