"use client";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/Login/Logo.png";
import LinkIcon from "@/app/components/link.png";
import ProfileIcon from "@/app/components/profile.png";
import EyeIcon from "@/app/components/eye.png"; // Import your eye icon here

export default function Navbar() {
  const pathname = usePathname();

  const isAddLinkActive = pathname === '/Add-link';
  const isProfileActive = pathname === '/profile-Details';
  const linkActiveClasses = "bg-[#efebff] text-[#beadff]";
  const linkInactiveClasses = "text-black bg-transparent";

  return (
    <div className="bg-[#fafafa] h-24 flex justify-center items-center">
      {/* Centering the navbar */}
      <nav className="bg-white shadow-md p-4 flex items-center justify-between rounded-lg w-11/12 px-4 border border-gray-200">
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">devlinks</span>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="/Add-link" legacyBehavior>
            <a className={`flex items-center space-x-1 ${isAddLinkActive ? linkActiveClasses : linkInactiveClasses} px-3 py-1 rounded`}>
              <Image 
                src={LinkIcon} 
                alt="Links Icon" 
                width={20} 
                height={20} 
                style={{ filter: isAddLinkActive ? 'none' : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(0%)' }}
              />
              <span className="hidden md:inline">links</span>
            </a>
          </Link>
          <Link href="/profile-Details" legacyBehavior>
            <a className={`flex items-center space-x-1 ${isProfileActive ? linkActiveClasses : linkInactiveClasses} px-3 py-1 rounded`}>
              <Image
                src={ProfileIcon}
                alt="Profile Icon"
                width={20}
                height={20}
                style={{ filter: isProfileActive ? 'invert(38%) sepia(70%) saturate(3277%) hue-rotate(216deg) brightness(102%) contrast(97%)' : 'none' }}
              />
              <span className="hidden md:inline">Profile Details</span>
            </a>
          </Link>
        </div>
        <button
          className="border border-[#633CFF] rounded px-4 py-2 text-[#633CFF] bg-transparent hover:bg-[#efebff] md:hidden flex items-center justify-center"
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#efebff")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <Image src={EyeIcon} alt="Eye Icon" width={20} height={20} />
        </button>
        <button
          className="hidden md:block border border-[#633CFF] rounded px-4 py-2 text-[#633CFF] bg-transparent hover:bg-[#efebff]"
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#efebff")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Preview
        </button>
      </nav>
    </div>
  );
}
