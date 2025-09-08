"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { useUser } from "@/context/UserContext";

export default function LoginForm() {
  const { login } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (
        searchTerm.trim() === "google login" ||
        searchTerm.trim() === "구글 로그인"
      ) {
        handleLogin();
      }
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="absolute left-1/2 top-1/2 px-5 max-w-screen-sm w-full -translate-1/2">
      <div className="text-center space-y-8">
        {/* 로고/제목 */}
        <div className="space-y-2">
          <h2 className="text-16-light md:text-18-light">Google Login</h2>
          <p className="text-14-light md:text-16-light text-gray-500">
            Find what you&apos;re looking for
          </p>
        </div>

        {/* 검색바 */}
        <div className="w-full mx-auto">
          <div
            className={`
              relative flex items-center
              bg-white rounded-full
              border border-gray-100
              transition-all duration-300 ease-out
              ${
                isFocused
                  ? "shadow-lg shadow-gray-200/50 scale-[1.02] ring-1 ring-gray-200"
                  : "shadow-md shadow-gray-200/30"
              }
              hover:shadow-lg hover:shadow-gray-200/40
            `}
          >
            <input
              type="text"
              placeholder="Search by"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              className="
                w-full px-6 py-4 
                bg-transparent rounded-full 
                text-gray-700 placeholder:text-gray-400
                text-16-light md:text-18-light
                outline-none border-none
                pr-14
              "
            />

            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              className={`
                absolute right-2 
                w-10 h-10 
                flex items-center justify-center
                rounded-full 
                transition-all duration-200 ease-out
                disabled:opacity-40 disabled:cursor-not-allowed
                ${
                  searchTerm.trim()
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:scale-105 active:scale-95"
                    : "bg-transparent hover:bg-gray-50 text-gray-400"
                }
                group
              `}
            >
              <IoIosSearch
                size={22}
                className={`
                  transition-all duration-200
                  ${searchTerm.trim() ? "scale-100" : "group-hover:scale-105"}
                `}
              />
            </button>

            {isFocused && (
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 -z-10 opacity-60" />
            )}
          </div>

          {searchTerm && (
            <div className="mt-2 md:mt-3 px-2">
              <p className="text-12-light text-gray-500 animate-fadeIn">
                Press Enter to search for &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
