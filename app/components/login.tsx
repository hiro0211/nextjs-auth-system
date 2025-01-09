"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Loading from "@/app/loading";
import * as z from "zod";
import type { Database } from "@/lib/database.types";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

export const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setMessage("エラーが発生しました" + error.message);
        return;
      }
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="メールアドレス"
            id="email"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.email?.message}
          </div>
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="パスワード"
            id="password"
            {...register("password", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.password?.message}
          </div>

          <div>
            {loading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="font-bold bg-sky-500 hover:brightness-95 text-white w-full p-2 rounded-full text-white text-sm"
              >
                ログイン
              </button>
            )}
          </div>
        </div>
      </form>

      {message && (
        <div className="my-5 text-center text-sm text-red-500">{message}</div>
      )}

      <div className="text-center text-sm mb-5">
        <Link href="/auth/reset-password" className="text-gray-500 font-bold">
          パスワードを忘れた場合
        </Link>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/signup" className="text-gray-500 font-bold">
          サインアップ
        </Link>
      </div>
    </div>
  );
};
