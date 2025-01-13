import { useApplicationHook } from "@/hook/useApplicationHook";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutApp } = useApplicationHook();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logoutUser = async () => {
    await logoutApp();
    window.location.reload();
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full p-1 hover:bg-gray-100">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="relative">
              <button className="flex items-center gap-2" onClick={toggleMenu}>
                <div className="h-8 w-8 rounded-full bg-gray-200">
                  <Image
                    src="/avatar-placeholder.png"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => router.push("/settings/profile")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      Mon Profil
                    </button>
                    <button
                      onClick={() => router.push("/settings")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      Paramètres
                    </button>
                    <button
                      onClick={logoutUser}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
