"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/Login/Logo.png';
import Lock from '@/app/Login/Lock.png';
import Envelope from '@/app/Login/Envelope.png';
import { signIn } from '../Create-account/auth'; // import the sign-in function

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const router = useRouter();

  const isFormValid = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      valid = false;
      newErrors.email = 'Can’t be empty';
    }
    if (!password) {
      valid = false;
      newErrors.password = 'Please check again';
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const user = await signIn(email, password);
        console.log('User logged in:', user);
        setIsLoggedIn(true); // Set login status to true
      } catch (error) {
        console.error('Login error:', error);
        // Handle login error, e.g., show an error message to the user
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/Add-link');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center flex-col px-4 md:px-0">
      {isLoggedIn && (
        <Link href="/Add-link" className="hidden" id="redirect-link" />
      )}
      <div className="text-center mb-6 flex flex-col items-center space-y-2">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <span className="text-2xl font-bold">devlinks</span>
      </div>
      <div className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="mb-4 text-sm">Add your details below to get back into the app</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className={`block text-sm font-medium mb-1 ${errors.email ? 'text-red-500' : ''}`} htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Envelope} alt="Email Icon" className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="e.g. alex@gmail.com"
                className={`w-full p-2 pl-10 pr-20 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)] placeholder:text-xs`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsInputFocused(true);
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {errors.email && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className={`block text-sm font-medium mb-1 ${errors.password ? 'text-red-500' : ''}`} htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Lock} alt="Password Icon" className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full p-2 pl-10 pr-20 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)] placeholder:text-xs`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsInputFocused(true);
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {errors.password && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                  {errors.password}
                </span>
              )}
            </div>
          </div>
          <button
            className={`w-full p-2 rounded ${isInputFocused ? (isFormValid ? 'bg-[#633bff] text-white' : 'bg-[#beadff] text-white cursor-not-allowed') : 'bg-[#633bff] text-white'}`}
            disabled={!isFormValid && isInputFocused}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/Create-account" className="text-[#633bff] block md:inline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
