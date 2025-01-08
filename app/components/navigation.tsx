"use client";

import Link from "next/link";
import type { Session } from "@supabase/supabase-js";

const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          Home
        </Link>
      </div>
      <div className="text-sm font-bold">
        {session ? (
          <div className="flex items-center space-x-5">
            <Link href="/setting/profile">Profile</Link>
          </div>
        ) : (
          <div className="flex items-center space-x-5">
            <Link href="/auth/login">ログイン</Link>
            <Link href="/auth/signup">サインアップ</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
