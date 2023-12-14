import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { gsap } from 'gsap';
import Lottie from "lottie-react";
import PhoneAnimation from "@/components/LoginFormPage/PhoneAnimation.json";
import {useRouter} from "next/router";

const LoginForm = () => {
  const frameRate = 25;
  const frameOfAppearEnd = 28;
  const durationOfAppearAnimation = ((frameOfAppearEnd - 0) / frameRate) * 1000;
  const frameOfScrollStart = 28;
  const frameOfScrollEnd = 123;
  const durationOfDisappearAnimation = ((138 - frameOfScrollStart) / frameRate) * 1000;
  const router = useRouter();
  const [animationControl, setAnimationControl] = useState({
    autoplay: true,
    loop: false,
    initialSegment: [0, frameOfAppearEnd],
  });

  const handleClick = () => {
    setAnimationControl({
      autoplay: true,
      loop: false,
      initialSegment: [frameOfScrollStart, 138],
    });

    gsap.to('.login-form-container', { duration: 0.4, autoAlpha: 0 });
    gsap.to('.login-form-container', { duration: 1, width: 0 });
    gsap.to('.middle-element', { duration: 1, width: 0, autoAlpha: 0, delay: 0.3 });
    gsap.to('.lottie-container', { duration: 1, width: '100%', delay: 0 });
    gsap.to('.lottie', { duration: 1, width: '30%', delay: 0 });

    setTimeout(() => {
      signIn("google").then(res=>
          router.push("/")
      );
    }, durationOfDisappearAnimation);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationControl({
        autoplay: true,
        loop: true,
        initialSegment: [frameOfScrollStart, frameOfScrollEnd],
      });
    }, durationOfAppearAnimation);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  return (
    <div className="flex justify-around items-center p-2 flex-1">
      <div className="lottie-container flex w-[45%] justify-center items-center">
        <Lottie
          animationData={PhoneAnimation}
          className="lottie w-5/6"
          {...animationControl}
        />
      </div>
      <div className="middle-element flex flex-col justify-between items-center">
        <hr className="h-[10em] w-[2px] border-0 bg-customPurple" />
        <i class="bi bi-arrow-right-circle text-4xl py-5"></i>
        <hr className="h-[10em] w-[2px] border-0 bg-customPurple" />
      </div>
      <div className="login-form-container flex w-[45%] justify-center items-center flex-col">
        <div className="bg-customPurple w-2/3 rounded-xl p-2 text-center">
          <h1 className="text-4xl py-1">Welcome to NEST</h1>
          <p style={{ fontFamily: "'Great Vibes', cursive" }} className="py-3">
            Discover, Connect, Explore
          </p>
          <button
            className="px-4 py-2 border-2 flex gap-2 bg-customDarkPurple border-transparent hover:border-customLightPurple rounded-lg text-slate-200 hover:text-slate-300 hover:shadow transition duration-150 mx-auto mt-16 mb-2"
            onClick={handleClick}
          >
            <img
              class="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            ></img>
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
