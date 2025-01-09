"use client";

import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";

const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <header className="shadow-lg shadow-gray-100">
      {/* 全体のレイアウト */}
      <div className="container max-w-screen-sm mx-auto flex items-center justify-between py-5">
        {/* 左側のロゴ */}
        <Link href="/" className="font-bold text-xl cursor-pointer">
          Home
        </Link>

        {/* 右側のリンク */}
        <div className="text-sm font-bold flex items-center space-x-5">
          {session ? (
            <Link href="/setting/profile">Profile</Link>
          ) : (
            <>
              <Link href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
