import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex relative flex-col w-full">
      <Navbar />

      <div className=" md:px-32 p-4 h-screen bg-gradient-to-bl from-violet-300 to-slate-100 dark:from-slate-950 dark:to-slate-800 w-screen flex items-center justify-center">
        <div className="w-full justify-between flex md:flex-row flex-col">
          <div className="flex flex-1 justify-center flex-col items-center">
            <div className="text-slate-900 dark:text-slate-200 text-[clamp(56px,6vw,36px)] font-semibold">
              AI-Powered Personalization
            </div>
            <div className="text-slate-700 dark:text-slate-400 text-[clamp(36px,6vw,30px)] font-semibold">
              Tailored content, interactive experiences
            </div>
            <Link to="/login">
              <button
                type="button"
                className="mt-6 px-5 py-2 rounded-full bg-violet-500 text-slate-200"
              >
                Get Started
              </button>
            </Link>
          </div>

          <div className="min-w-[260px] w-[350px]">
            <img src={"./Landing.png"} alt="LandingImage" />
          </div>
        </div>
      </div>
    </div>
  );
}
