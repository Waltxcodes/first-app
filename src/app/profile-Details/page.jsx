"use client";
import { useState, useRef, useEffect } from 'react';
import { storage, firestore } from '@/app/Create-account/auth'; // Adjust the path as needed
import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Phone from '@/app/Add-link/phone.png'; // Ensure this path is correct
import Box from '@/app/profile-Details/box.png'; // Ensure this path is correct
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

function ProfileDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState(null);
  const [newProfileSaved, setNewProfileSaved] = useState(false);

  const fetchProfileData = async () => {
    try {
      const q = query(collection(firestore, "profiles"), orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    if (!newProfileSaved) {
      fetchProfileData();
    }
  }, [newProfileSaved]);

  const handleSave = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { firstName: '', lastName: '', email: '' };

    if (!firstName) {
      valid = false;
      newErrors.firstName = "can't be empty";
    }
    if (!lastName) {
      valid = false;
      newErrors.lastName = "can't be empty";
    }
    if (!email) {
      valid = false;
      newErrors.email = "can't be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);

    if (valid && profileImage) {
      try {
        // Upload the image to Firebase Storage
        const imageRef = ref(storage, `images/${profileImage.name}`);
        await uploadBytes(imageRef, profileImage);
        const imageUrl = await getDownloadURL(imageRef);

        // Save the image URL and email to Firestore
        await addDoc(collection(firestore, "profiles"), {
          firstName,
          lastName,
          email,
          profileImage: imageUrl,
          timestamp: new Date(),
        });

        setNewProfileSaved(true);
        setProfileData({
          firstName,
          lastName,
          email,
          profileImage: imageUrl,
        });
        console.log('Profile details saved');
      } catch (error) {
        console.error('Error saving profile details:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <div className="px-4 mt-0 bg-[#fafafa]">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* First Container */}
          <div className="hidden lg:flex bg-white p-6 rounded-lg shadow-md flex-grow basis-14 items-center justify-center relative">
            <div className="relative w-64 h-128">
              <Image src={Phone} alt="Phone Image" />
              {newProfileSaved && profileData && (
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '-20px' }}>
                  {profileData.profileImage && (
                    <img
                      src={profileData.profileImage}
                      alt="Profile Image"
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                  )}
                  <div className="text-center">
                    <p className="font-bold text-xl text-black bg-white">{profileData.firstName} {profileData.lastName}</p>
                    <p className="text-black mb-64 bg-white">{profileData.email}</p>
                  </div>
                  
                </div>
              )}
              
            </div>
          </div>

          {/* Second Container */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-grow basis-48 md:h-[2000px] lg:h-auto">
            <h2 className="text-2xl font-bold mb-2">Profile Details</h2>
            <p className="mb-4">Add your details to create a personal touch to your profile</p>

            {/* Profile Picture Section */}
            <div className="bg-[#fafafa] p-8 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <p className="mb-2 w-1/3">Profile picture</p>
                <div className="bg-[#EFEBFF] p-4 rounded-lg flex flex-col items-center w-1/2 relative">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile Image"
                      className="mb-4 w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <Image src={Box} alt="Upload Image" width={100} height={100} className="mb-4" />
                  )}
                  <button
                    className="text-[#633bff] mb-2"
                    onClick={handleUploadClick}
                  >
                    {profileImage ? 'Change image' : '+ Upload image'}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className="w-1/2 flex flex-col">
                  <p className="text-sm">Image must be below 1024x1024px</p>
                  <p className="text-sm">Use PNG or JPG format</p>
                </div>
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="bg-[#fafafa] p-8 mb-4">
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between mb-4 relative">
                  <label className={`block text-gray-700 mb-2 w-1/3 ${errors.firstName ? 'text-red-500' : ''}`}>
                    First name*
                  </label>
                  <div className="relative w-2/3">
                    <input
                      type="text"
                      placeholder="e.g. John"
                      className={`w-full p-2 pr-20 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)]`}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 relative">
                  <label className={`block text-gray-700 mb-2 w-1/3 ${errors.lastName ? 'text-red-500' : ''}`}>
                    Last name*
                  </label>
                  <div className="relative w-2/3">
                    <input
                      type="text"
                      placeholder="e.g. Appleseed"
                      className={`w-full p-2 pr-20 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)]`}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 relative">
                  <label className={`block text-gray-700 mb-2 w-1/3 ${errors.email ? 'text-red-500' : ''}`}>
                    Email address*
                  </label>
                  <div className="relative w-2/3">
                    <input
                      type="email"
                      placeholder="e.g. johnappleseed@mail.com"
                      className={`w-full p-2 pr-20 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)]`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-red-500">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-[#633bff] text-white py-2 px-4 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
