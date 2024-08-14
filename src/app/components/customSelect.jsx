import { useState } from 'react';
import Image from 'next/image';
import GithubIcon from '@/app/Add-link/github.png';
import YoutubeIcon from '@/app/Add-link/youtube.png';
import LinkedInIcon from '@/app/Add-link/linkedin.png';
import FacebookIcon from '@/app/Add-link/facebook.png';
import FrontendIcon from '@/app/Add-link/frontend.png';

const platforms = [
  { value: 'Github', label: 'Github', icon: GithubIcon },
  { value: 'Youtube', label: 'Youtube', icon: YoutubeIcon },
  { value: 'LinkedIn', label: 'LinkedIn', icon: LinkedInIcon },
  { value: 'Facebook', label: 'Facebook', icon: FacebookIcon },
  { value: 'FrontendMentor', label: 'FrontendMentor', icon: FrontendIcon },
];

function CustomSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (platform) => {
    onChange(platform.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#633bff] focus:shadow-[0_0_0_4px_rgba(99,59,255,0.15)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? platforms.find((p) => p.value === value).label : 'Select a platform'}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {platforms.map((platform) => (
            <div
              key={platform.value}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(platform)}
            >
              <Image src={platform.icon} alt={platform.label} width={20} height={20} className="mr-2" />
              {platform.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
