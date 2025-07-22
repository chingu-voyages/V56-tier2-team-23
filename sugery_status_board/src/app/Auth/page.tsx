import Link from "next/link";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";

// auth module
export default function AuthModule() {
  return (
    <article className="sm:w-[60%] md:w-[40%] w-[80%] mx-auto flex flex-col justify-center p-4 shadow m-2 items-center">
      <h1 className="font-bold font-header text-lg text-center">
        Acess Life Orbit{" "}
      </h1>
      <h2 className="text-gray-600 text-center">
        Login to access surgery data or continue as visitor to access status
        board
      </h2>
      <form className="grid grid-cols-1 gap-y-2 " action="">
        <div>
          <label htmlFor="user-email">
            <span className="text-red-600">*</span>Email:
          </label>
          <input
            required
            id="email"
            type="email"
            className="w-[100%] p-2 border rounded border-gray-300 outline-accentSub"
            placeholder="eg johndoe@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="user-password">
            <span className="text-red-600">*</span>Password:
          </label>
          <input
            required
            type="password"
            className="w-[100%] p-2 rounded border border-gray-300 outline-accentSub"
            placeholder="*****"
          />
        </div>

        <button
          type="submit"
          className="bg-accentMain w-[80%] flex justify-center items-center space-x-3 py-2 mx-[10%] mt-2 rounded-lg text-white hover:bg-accentSub"
        >
          <p>Sign In</p>
          <LuLogIn />
        </button>

        <p className="underline text-left">Show dummy credentials</p>
      </form>

      <hr className="w-[90%] mx-[5%] text-gray-500 mt-6 mb-4 " />

      <Link
        href={"/"}
        className="bg-gray-100 w-[80%] flex justify-center items-center space-x-3 py-2 mx-[10%] mt-2 rounded-lg text-dark hover:bg-gray-400"
      >
        <button type="submit" className=" ">
          Continue as visitor
        </button>
        <MdOutlineMonitorHeart size="16" />
      </Link>
    </article>
  );
}
