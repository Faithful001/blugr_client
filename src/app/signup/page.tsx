"use client";
import { ApiCall } from "@/utils/Api/apiCall";
import { ApiUrl } from "@/utils/Api/apiUrl";
import Link from "next/link";
import React, { useState } from "react";

export default function Signup() {
	const [user, setUser] = useState<object>({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState<any>(null);

	const [visible, setVisible] = useState<boolean>(false);

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		///api classes instantiations
		const apiCall = new ApiCall();
		const apiUrl = new ApiUrl();

		// const body = { email, password };

		try {
			const response = await apiCall.postRequest(apiUrl.signup, user);
			console.log(response);
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
			<p className="font-bold text-xl">Create an account</p>
			<form
				className="signup-form flex flex-col items-center justify-center gap-3 "
				onSubmit={handleSignup}
			>
				<div className="flex flex-col">
					<label className="text-slate-500 text-sm" htmlFor="username">
						Your username
					</label>
					<input
						className="email rounded-md p-2 px-5 text-black border-[1px] border-slate-500"
						type="text"
						placeholder="johndoe"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, username: e.target.value })
						}
					/>
				</div>
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
				<button
					className="bg-blue-700 px-[105px] text-white font-normal p-2 rounded-lg"
					type="submit"
				>
					Signup
				</button>
			</form>
			<div>
				<p>
					Already have an account?
					<Link className="text-blue-700" href={"login"}>
						Login
					</Link>
				</p>
			</div>
			<div>{error && <p className="text-red-700 text-base">{error}</p>}</div>
		</div>
	);
}
