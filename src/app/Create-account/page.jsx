"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/Login/Logo.png';
import Lock from '@/app/Login/Lock.png';
import Envelope from '@/app/Login/Envelope.png';
import { signUp } from './auth'; // Ensure this path is correct

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [errors, setErrors] = useState({ email: '', createPassword: '', confirmPassword: '' });
  const [isSignedUp, setIsSignedUp] = useState(false); // New state to track sign-up status
  const router = useRouter();

  const isFormValid = email && createPassword && confirmPassword && createPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: '', createPassword: '', confirmPassword: '' };

    if (!email) {
      valid = false;
      newErrors.email = 'Can’t be empty';
    }
    if (!createPassword) {
      valid = false;
      newErrors.createPassword = 'Please check again';
    }
    if (!confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Please check again';
    }
    if (createPassword !== confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const user = await signUp(email, createPassword);
        console.log('User credentials:', user);
        setIsSignedUp(true); // Set sign-up status to true

        // Reset form fields
        setEmail('');
        setCreatePassword('');
        setConfirmPassword('');
        setErrors({ email: '', createPassword: '', confirmPassword: '' });
      } catch (error) {
        console.error('Signup error: ', error);
        // Handle sign-up error (e.g., display an error message)
      }
    }
  };

  useEffect(() => {
    if (isSignedUp) {
      router.push('/Login');
    }
  }, [isSignedUp, router]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center flex-col px-4 md:px-0">
      {isSignedUp && (
        <Link href="/Login" className="hidden" id="redirect-link" />
      )}
      <div className="text-center mb-6 flex flex-col items-center space-y-2">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <span className="text-2xl font-bold">devlinks</span>
      </div>
      <div className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">Create account</h1>
        <p className="mb-4 text-sm">Let's get you started sharing your links!</p>
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
            <label className={`block text-sm font-medium mb-1 ${errors.createPassword ? 'text-red-500' : ''}`} htmlFor="createPassword">
              Create Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Lock} alt="Password Icon" className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="createPassword"
                type="password"
                placeholder="At least 8 characters"
                className={`w-full p-2 pl-10 pr-20 border ${errors.createPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)] placeholder:text-xs`}
                value={createPassword}
                onChange={(e) => {
                  setCreatePassword(e.target.value);
                  setIsInputFocused(true);
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {errors.createPassword && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                  {errors.createPassword}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className={`block text-sm font-medium mb-1 ${errors.confirmPassword ? 'text-red-500' : ''}`} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Lock} alt="Password Icon" className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="At least 8 characters"
                className={`w-full p-2 pl-10 pr-20 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)] placeholder:text-xs`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setIsInputFocused(true);
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {errors.confirmPassword && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">Password must contain at least 8 characters</p>
          <button
            className={`w-full p-2 rounded ${isInputFocused ? (isFormValid ? 'bg-[#633bff] text-white' : 'bg-[#beadff] text-white cursor-not-allowed') : 'bg-[#633bff] text-white'}`}
            disabled={!isFormValid && isInputFocused}
          >
            Create new account
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/Login" className="text-[#633bff] block md:inline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
