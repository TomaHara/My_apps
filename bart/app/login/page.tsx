"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../AuthProvider";

const LoginForm = () => {
  const { values, setValues } = useContext(AuthContext);
  const [errorMessage, seterrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, username: e.target.value });
    console.log(values);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.username) {
      const docRef = doc(db, "Users", values.username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User exists");
        setValues({ ...values, auth: true });
        seterrorMessage("");
        router.push("/instruction");
      } else {
        console.log("No such user!");
        seterrorMessage("登録されていません");
      }
    } else {
      console.error("Error checking user existence");
      seterrorMessage("エラーが発生しました。もう一度お試しください。");
    }
  };

  const handleClick = () => {
    setValues({ auth: false, username: "" });
    router.push("/instruction");
  };
  return (
    <div>
      <header>サインイン画面</header>
      <main>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>参加者IDを入力してください。</label>
          <input
            type="text"
            placeholder="参加者ID"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">サインイン</button>
          <p>{errorMessage}</p>
        </form>
        <button onClick={() => handleClick()}>デモプレイ</button>
      </main>
    </div>
  );
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
