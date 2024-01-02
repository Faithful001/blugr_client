"use client";
import { ApiCall } from "@/utils/Api/apiCall";
import { ApiUrl } from "@/utils/Api/apiUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { ReloadIcon } from "@radix-ui/react-icons"

// import { Button } from "@/components/ui/button";

export default function Login() {
	const [user, setUser] = useState<object>({
		email: "",
		password: "",
	});
	const [error, setError] = useState<any>(null);

	const router = useRouter();
	const [visible, setVisible] = useState<boolean>(false);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		///api classes instantiations
		const apiCall = new ApiCall();
		const apiUrl = new ApiUrl();

		try {
			const response = await apiCall.postRequest(apiUrl.login, user);
			console.log(response.data);
			if (response.status === 200) {
				router.push("/");
			}
		} catch (error: any) {
			setError(error?.response?.data.error);
			console.error(error?.response);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center gap-3 pt-10">
			<h1 className="text-2xl">
				<i>Welcome to</i> <b>blugr</b>
			</h1>
			<p className="font-bold text-xl">Log in to your account</p>
			<form
				className="login-form flex flex-col items-center justify-center gap-3 "
				onSubmit={handleLogin}
			>
				<div className="flex flex-col">
					<label className="text-slate-500 text-sm" htmlFor="email">
						Your email
					</label>
					<input
						className="email rounded-md p-2 px-5 text-black border-[1px] border-slate-500"
						type="text"
						placeholder="example@gmail.com"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, email: e.target.value })
						}
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-slate-500 text-sm" htmlFor="password">
						Your password
					</label>
					<div className="flex items-center justify-between relative">
						<input
							className="password rounded-md p-2 px-5 text-black border-[1px] border-slate-500"
							type={`${visible ? "text" : "password"}`}
							placeholder="******"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setUser({ ...user, password: e.target.value })
							}
						/>
						{visible ? (
							<span
								className="material-symbols-outlined absolute right-2 cursor-pointer"
								onClick={() => setVisible(!visible)}
							>
								visibility
							</span>
						) : (
							<span
								className="material-symbols-outlined absolute right-2 cursor-pointer"
								onClick={() => setVisible(!visible)}
							>
								visibility_off
							</span>
						)}
					</div>
				</div>
				{
					<button
						className="bg-blue-700 px-[110px] text-white font-normal p-2 rounded-lg"
						type="submit"
					>
						Login
					</button>
				}
			</form>
			<div>
				<p>
					Don't have an account?
					<Link className="text-blue-700" href={"signup"}>
						Signup
					</Link>
				</p>
			</div>
			<div>{error && <p className="text-red-700 text-base">{error}</p>}</div>
		</div>
	);
}
