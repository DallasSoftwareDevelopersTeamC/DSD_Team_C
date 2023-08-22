import React from "react";
import LoginWindow from "./LoginWindow";

const LoginLanding = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className=" gap-4 bg-zinc-100  max-w-2xl p-4 px-8 rounded-3xl drop-shadow-xl  mx-4">
        <div className=" flex flex-col gap-4 rounded-3xl  ">
          <div className="flex flex-col gap-8 lg:gap-4 lg:flex-row justify-evenly items-center ">
            <div className="flex flex-col justify-center  w-full lg:w-2/3 bg-zinc-100 rounded-3xl p-4">
              <span className=" font-bold text-7xl mb-4 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
                Orderly.
              </span>
              <h1 className="text-5xl font-bold tracking-tighter  mb-4">
                Inventory Intelligence,{" "}
                <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">
                  Automated.
                </span>
              </h1>
              <h1 className="text-3xl font-bold tracking-tighter   ">
                Track, manage, and optimize{" "}
                <span className="italic">effortlessly.</span>
              </h1>
            </div>
            <div className="">
              <LoginWindow />
            </div>
          </div>

          <div className="rounded-3xl flex justify-center pb-4  ">
            <img
              src="/orderlypreview.png"
              className="rounded-3xl   lg:max-w-screen-xs   "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
