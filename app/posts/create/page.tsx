import CreatePostPage from "@/components/posts/CreatePostPage";
import { createPostAction } from "@/server/actions/post";

export default function Page() {
  return <CreatePostPage action={createPostAction} />;
}
