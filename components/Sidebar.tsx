// 로그인 되어있을 때만 나타나는 사이드바
import { signOutAction } from "@/server/actions/auth";
import { auth } from "@/auth";
import { ProfileImg } from "./Images";
import { getUserById } from "@/server/actions/user";
import Link from "next/link";
import {
  InstagramLogo,
  InstagramIcon,
  HomeIcon,
  SearchIcon,
  DirectIcon,
  HeartIcon,
  PlusIcon,
} from "./Icons";
import ListItem from "./SidebarListItem";

export default async function Sidebar() {
  const session = await auth();
  const id = Number(session?.user?.id);
  let currentUser;
  try {
    currentUser = await getUserById(id);
  } catch (err) {
    console.log(err);
    throw Error("User not found");
  }

  return (
    <aside className="h-full w-[70px] md:w-[220px] bg-inherit px-3 md:px-5 py-10 flex flex-col items-center border-r border-(--border)">
      <div className="hidden md:block mb-10">
        <Link href="/">
          <InstagramLogo size={100} />
        </Link>
      </div>
      <div className="md:hidden mb-10">
        <Link href="/">
          <InstagramIcon />
        </Link>
      </div>
      <ul className="w-full text-base flex flex-col gap-3">
        <Link href="/">
          <ListItem icon={<HomeIcon />} label="홈" />
        </Link>
        <ListItem icon={<SearchIcon />} label="검색" />
        <ListItem icon={<DirectIcon />} label="메시지" />
        <ListItem icon={<HeartIcon />} label="알림" />
        <Link href="/posts/create">
          <ListItem icon={<PlusIcon />} label="만들기" />
        </Link>
        <Link href={`/${currentUser?.handle}`}>
          <ListItem
            icon={<ProfileImg url={currentUser?.profileImg!} size={24} />}
            label="프로필"
          />
        </Link>
      </ul>
      <form action={signOutAction}>
        <button>로그아웃</button>
      </form>
    </aside>
  );
}
