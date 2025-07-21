import { z } from "zod";

export const FormSchema = z.object({
  handle: z
    .string()
    .trim()
    .nonempty({ message: "사용자 아이디를 입력해 주세요." })
    .regex(
      /^[A-Za-z0-9_]+$/,
      "사용자 아이디에는 영어, 숫자, 밑줄(_)만 사용할 수 있습니다."
    ),
  name: z.string().trim().nonempty({ message: "사용자 이름을 입력해 주세요." }),
  website: z.url({ message: "잘못된 URL입니다." }),
});
