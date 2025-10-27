
import React from 'react';
import { translations } from '../utils/translations';

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-12 h-12 md:w-16 md:h-16 text-cyan-400"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12.963 2.286a.75.75 0 00-1.927 0l-7.5 4.5A.75.75 0 003 7.5v6.19l-1.72 1.032a.75.75 0 00-.36 1.063l.16.278a.75.75 0 001.063.36L3 15.44v3.81a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75v-3.81l1.72 1.032a.75.75 0 001.063-.36l.16-.278a.75.75 0 00-.36-1.063L21 13.69V7.5a.75.75 0 00-.537-.714l-7.5-4.5zM12 4.154l5.822 3.493V14.25a.75.75 0 00-.342.646l-.582 3.493a.75.75 0 00.28.708l.245.245a.75.75 0 001.06 0l.245-.245a.75.75 0 00.28-.708l-.582-3.493A.75.75 0 0018.75 14.25V7.647L12 4.154zM8.03 8.03a.75.75 0 011.06 0L12 10.94l2.91-2.91a.75.75 0 111.06 1.06L13.06 12l2.91 2.91a.75.75 0 11-1.06 1.06L12 13.06l-2.91 2.91a.75.75 0 01-1.06-1.06L10.94 12 8.03 9.09a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

interface HeaderProps {
  t: typeof translations.en;
}

const Header: React.FC<HeaderProps> = ({ t }) => {
  return (
    <header className="text-center p-4 md:p-6">
      <div className="flex items-center justify-center gap-4 mb-2">
        <ShieldIcon />
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          TruthCheck AI
        </h1>
      </div>
      <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {t.headerDescription}
      </p>
    </header>
  );
};

export default Header;
