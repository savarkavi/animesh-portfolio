"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const ContactPage = () => {
  useGSAP(() => {
    gsap.to(".contact-form-container", { opacity: 1, y: 0, duration: 1 });
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#fff6db] bg-gradient-to-b from-[#0099ff] from-30% via-[#fff6db] via-90% p-4 pt-24 pb-20 xl:pt-32">
      <div className="z-[1] flex w-full max-w-[800px] flex-col items-center gap-12">
        <h1 className={`text-center text-6xl text-white uppercase lg:text-7xl`}>
          Contact
        </h1>

        <div className="contact-form-container relative w-full translate-y-20 rounded-2xl bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px] p-8 opacity-0 shadow-[-10px_10px_0px_0px_#f54a00] md:p-12">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex w-full flex-col gap-6 font-semibold text-black"
          >
            <input
              type="hidden"
              name="access_key"
              value="a16737e1-d1ee-486f-8833-b5e16a87804b"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xl">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-xl border-2 border-black bg-white bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:10px_10px] p-4 transition-shadow outline-none focus:shadow-[-5px_5px_0px_0px_#f54a00]"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xl">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border-2 border-black bg-white bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:10px_10px] p-4 transition-shadow outline-none focus:shadow-[-5px_5px_0px_0px_#f54a00]"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xl">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border-2 border-black bg-white bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:10px_10px] p-4 transition-shadow outline-none focus:shadow-[-5px_5px_0px_0px_#f54a00]"
                placeholder="Hello Animesh, I would like to discuss..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl border-2 border-black bg-[#ff9900] p-4 text-xl font-bold uppercase transition-all hover:translate-y-[-2px] hover:shadow-[-5px_5px_0px_0px_#f54a00] active:translate-y-[2px] active:shadow-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
