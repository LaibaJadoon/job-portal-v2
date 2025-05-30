"use client"; // Required for client-side hooks like useRouter

import { useRouter } from "next/navigation"; // V2: useRouter replaces useNavigate

export default function Home() {
  const router = useRouter();

  const handleBrowseJobs = () => {
    router.push("/jobs"); // V2: Navigate to Jobs page
  };

  const scrollToHowToApply = () => {
    const section = document.getElementById("how-to-apply");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex sm:flex-row flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-10 max-w-7xl mx-auto h-auto lg:h-[calc(100vh-80px)]">
      <div className="text-[#030342] max-w-2xl w-full text-center lg:text-left mt-8 lg:mt-0 flex flex-col items-center lg:items-start">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold mb-4 leading-snug"
          style={{
            textShadow: "2px 2px 6px #b2b2c2",
            letterSpacing: "0.04em",
          }}
        >
          <span className="block">UNLOCK YOUR</span>
          <span className="block">CAREER POTENTIALS</span>
          <span className="block">WITH CAREER CONNECTS</span>
        </h1>
        <p className="text-sm sm:text-base mb-6 text-[#030342cc] max-w-md">
          Discover thousands of career paths tailored to your strengths...
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
          <button
            onClick={handleBrowseJobs}
            className="bg-[#030342] text-[#ebebf2] px-5 py-2.5 rounded font-semibold hover:bg-[#02022c] transition"
          >
            Browse Jobs
          </button>
          <button
            onClick={scrollToHowToApply}
            className="border-2 border-[#030342] text-[#030342] px-5 py-2.5 rounded font-semibold hover:bg-[#030342] hover:text-[#ebebf2] transition"
          >
            How it Works
          </button>
        </div>
      </div>

      <div className="w-full lg:w-auto flex justify-center mb-10 lg:mb-0">
        <img
          src="/logo.png" // Use public folder path directly as string starting with '/'
          alt="3D Job"
          width={360}
          height={360}
          className="rounded-xl shadow-xl transform hover:scale-125 transition-all duration-500"
          style={{
            filter: "drop-shadow(6px 6px 10px #010120)",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        />
      </div>
    </div>
  );
}
