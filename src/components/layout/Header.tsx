import { BellIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Header() {
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
              <button className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 