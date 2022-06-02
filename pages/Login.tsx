import React, { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const Login: NextPage = (props: any) => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			user && router.push("/");
		});
		return () => unSub();
	}, [router]);

	return (
		<div className={`bg-red-300 h-screen flex items-center justify-center`}>
			<div
				className={`bg-white h-full lg:h-1/2 w-full lg:w-1/5 flex flex-col items-center justify-center`}>
				<h1 className={`text-2xl text-red-300`}>
					{isLogin ? "Login" : "Register"}
				</h1>
				<small className={`text-red-300 mt-5`}>Email</small>
				<input
					value={email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					className={`border-2 border-red-300 pl-1`}
					placeholder="input Email"
				/>
				<small className={`text-red-300 mt-5`}>Password</small>
				<input
					value={password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					className={`border-2 border-red-300 pl-1`}
					placeholder="input Password"
				/>
				<button
					className={`bg-red-300 text-white py-1 px-2 mt-8`}
					onClick={
						isLogin
							? async () => {
									try {
										await signInWithEmailAndPassword(auth, email, password);
										router.push("/");
									} catch (error: any) {
										alert(error.message);
									}
							  }
							: async () => {
									try {
										await createUserWithEmailAndPassword(auth, email, password);
										router.push("/");
									} catch (error: any) {
										alert(error.message);
									}
							  }
					}>
					{isLogin ? "Login" : "Register"}
				</button>
				<p
					onClick={() => setIsLogin(!isLogin)}
					className={`text-red-300 cursor-pointer mt-5 border-b-2 border-red-300`}>
					{isLogin ? "Create new account？" : "Back to Login"}
				</p>
			</div>
		</div>
	);
};

export default Login;
