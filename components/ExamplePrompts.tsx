
import React from 'react';
import { translations } from '../utils/translations';

interface ExamplePromptsProps {
  onExampleClick: (text: string) => void;
  t: typeof translations.en;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onExampleClick, t }) => {
  const examples = [
    { title: t.example1Title, text: t.example1Text },
    { title: t.example2Title, text: t.example2Text },
    { title: t.example3Title, text: t.example3Text },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-center text-lg font-semibold text-gray-500 dark:text-gray-400 mb-4">
        {t.startExample}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.text)}
            className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            aria-label={`Load example: ${example.title}`}
          >
            <p className="font-bold text-cyan-500 dark:text-cyan-400 mb-1">{example.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{example.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
