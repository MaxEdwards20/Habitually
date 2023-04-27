import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Build Better Habits,</span>
            <span className="block text-pink-600">Live a Better Life</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Habit tracking can help you form and maintain good habits over time.
            By tracking your progress, you can see how far you've come and stay
            motivated to keep going.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to={"/create-account"}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10"
              >
                Sign up for free
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to={"/login"}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
        <blockquote className="mt-16">
          <p className="text-xl text-gray-500 max-w-2xl mx-auto text-center">
            "You do not rise to the level of your goals. You fall to the level
            of your systems."
          </p>
          <p className="mt-5 text-lg font-medium text-gray-900 text-center">
            &mdash; James Clear
          </p>
        </blockquote>
      </div>
    </div>
  );
};
