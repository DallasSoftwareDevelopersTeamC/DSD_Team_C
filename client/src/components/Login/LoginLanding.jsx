import React from "react";
import LoginWindow from "./LoginWindow";

const LoginLanding = () => {
  return (
    <div className="flex flex-col gap-4 max-w-screen-lg">
      

        <div className=" flex flex-col bg-zinc-100 rounded-3xl p-8 pb-0 drop-shadow-xl">

<div className="flex mb-5">
    <div className="">
    <h1 className="text-8xl font-bold tracking-tighter">
             Inventory Intelligence, <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">Automated.</span> 
          </h1>
          <h1 className="text-5xl font-bold tracking-tighter mt-5">
          Track, manage, and optimize <br/> effortlessly with  <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">Orderly.</span>
          </h1>
    </div>
    <div className="w-2/3 mt-14 mr-10">
        <LoginWindow />
    </div>

    

</div>

<div className="rounded-3xl flex justify-center  ">
            <img
              src="/orderlyprev.png"
              className="rounded-3xl  max-w-screen-lg p-4 "
            />
          </div>



        </div>

    </div>
  );
};

export default LoginLanding;
