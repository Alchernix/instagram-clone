"use client";

import { motion } from "motion/react";
import type { User } from "@/app/generated/prisma";
import type { PostWithInfo } from "@/server/actions/post";
import { HeartIcon, ColoredHeartIcon } from "./Icons";
import { useState, useOptimistic, useActionState } from "react";
import { createLike, deleteLike } from "@/server/actions/like";

type LikeState = {
  liked: boolean;
  likeId: number | null;
  likeCount: number;
};

type LikeProps = {
  post: PostWithInfo;
  currentUserId: number;
  author: User;
};

export default function Like({ post, currentUserId, author }: LikeProps) {
  const [like, setLike] = useState<LikeState>({
    liked: post.likes.length > 0,
    likeId: post.likes[0]?.id,
    likeCount: post._count.likes,
  });
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    like,
    (state, mode: "liked" | "unliked") => {
      if (mode === "liked") {
        return { ...state, liked: true, likeCount: state.likeCount + 1 };
      } else {
        return { ...state, liked: false, likeCount: state.likeCount - 1 };
      }
    }
  );

  async function likeAction(prevState: {}, formData: FormData) {
    if (like.liked) {
      setOptimisticLike("unliked");
      await deleteLike(formData);
      setLike((prev) => ({
        liked: false,
        likeId: null,
        likeCount: optimisticLike.likeCount - 1,
      }));
    } else {
      setOptimisticLike("liked");
      const likeId = await createLike(formData);
      setLike((prev) => ({
        liked: true,
        likeId: likeId,
        likeCount: optimisticLike.likeCount + 1,
      }));
    }
    return {};
  }

  const [prevState, formAction, isPending] = useActionState(likeAction, {});

  const variants: any = {
    liked: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.15,
        times: [0, 0.666, 1],
      },
    },
    unliked: { scale: 1.0 },
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="likeId" value={like.likeId || ""} />
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="userId" value={currentUserId} />
      <input type="hidden" name="targetUserId" value={author.id} />

      <motion.button
        variants={variants}
        initial={false}
        animate={optimisticLike.liked ? "liked" : "unliked"}
        className={`flex gap-1.5 items-center cursor-pointer ${
          optimisticLike.liked ? "active:opacity-50" : "hover:opacity-50"
        }`}
        disabled={isPending}
      >
        {optimisticLike.liked ? <ColoredHeartIcon /> : <HeartIcon />}
        <p className="font-bold">{optimisticLike.likeCount}</p>
      </motion.button>
    </form>
  );
}

// type IconContainerProps = {
//   icon: React.ReactNode;
//   classes?: string;
//   count?: number | null;
// };

// export function IconContainer({
//   icon,
//   classes = "",
//   count = null,
// }: IconContainerProps) {
//   const container: Variants = {
//     liked: {scale: 1.2},
//     unliked: {scale: 1.0}
//   }

//   return (
//     <motion.button
//     animate={}
//       className={`flex gap-1.5 items-center cursor-pointer hover:opacity-50 ${classes}`}
//     >
//       {icon}
//       {typeof count === "number" && <p className="font-bold">{count}</p>}
//     </motion.button>
//   );
// }
