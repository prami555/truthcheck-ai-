
import React, { useState } from 'react';
// FIX: Use FactCheckResult and Verdict types which are defined in types.ts.
import { FactCheckResult, Verdict } from '../types';
import { translations } from '../utils/translations';

const CheckCircleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuestionMarkCircleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.044.588.05H11a.75.75 0 01.75.75v1.468c0 .265.105.52.293.707l1.414 1.414a.75.75 0 001.06-1.06l-1.414-1.414A.75.75 0 0112.25 12h-2.502a2.25 2.25 0 00-2.532-2.146c-.37-.06-.752-.096-1.144-.112M17.25 12a2.25 2.25 0 100 2.186m0-2.186c.37.06.752.096 1.144.112M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);

const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);


interface ResultDisplayProps {
  // FIX: Use FactCheckResult which is defined in types.ts.
  result: FactCheckResult;
  t: typeof translations.en;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, t }) => {
  // FIX: Create a classification based on the verdict to match this component's logic.
  const getClassification = (verdict: Verdict): 'REAL' | 'FAKE' | 'UNCERTAIN' => {
    switch (verdict) {
      case 'True':
        return 'REAL';
      case 'False':
        return 'FAKE';
      case 'Misleading':
      case 'Partially True':
      case 'Unverifiable':
      default:
        return 'UNCERTAIN';
    }
  };
  const classification = getClassification(result.verdict);

  const resultConfig = {
    // FIX: Key by string literals instead of a non-existent Classification enum.
    'REAL': {
      label: t.resultReal,
      icon: <CheckCircleIcon />,
      bgColor: 'dark:bg-gradient-to-br dark:from-green-800/60 dark:to-gray-900 bg-gradient-to-br from-green-100 to-white',
      textColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-400 dark:border-green-500',
    },
    'FAKE': {
      label: t.resultFake,
      icon: <XCircleIcon />,
      bgColor: 'dark:bg-gradient-to-br dark:from-red-900/70 dark:to-gray-900 bg-gradient-to-br from-red-100 to-white',
      textColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-400 dark:border-red-500/50',
    },
    'UNCERTAIN': {
      label: t.resultUncertain,
      icon: <QuestionMarkCircleIcon />,
      bgColor: 'dark:bg-gradient-to-br dark:from-yellow-900/70 dark:to-gray-900 bg-gradient-to-br from-yellow-100 to-white',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      borderColor: 'border-yellow-500 dark:border-yellow-500/50',
    },
  };

  const config = resultConfig[classification];
  const [shareStatus, setShareStatus] = useState<'idle' | 'shared' | 'copied'>('idle');

  const handleShare = async () => {
    const classificationLabel = resultConfig[classification].label;
    // FIX: Use result.explanation instead of result.reasoning.
    const shareText = `TruthCheck AI classified this as "${classificationLabel}": ${result.explanation}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TruthCheck AI Analysis',
          text: shareText,
        });
        setShareStatus('shared');
      } catch (error) {
        console.error('Share API error:', error);
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }

    setTimeout(() => setShareStatus('idle'), 2500);
  };
  
  const getShareButtonText = () => {
    switch(shareStatus) {
      case 'copied': return 'Copied to Clipboard!';
      case 'shared': return 'Shared!';
      default: return 'Share Result';
    }
  };


  return (
    <>
      <style>
        {`
          @keyframes slide-fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-fade-in {
            animation: slide-fade-in 0.4s ease-out forwards;
          }
          .animation-delay-150 { animation-delay: 150ms; }
          .animation-delay-300 { animation-delay: 300ms; }
          .animation-delay-450 { animation-delay: 450ms; }

          @keyframes pulse-icon {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.15);
            }
          }
          .animate-pulse-icon {
            animation: pulse-icon 2.5s ease-in-out infinite;
          }
        `}
      </style>
      <div className={`mt-6 p-4 md:p-6 border rounded-lg shadow-lg transition-all duration-300 ease-in-out ${config.bgColor} ${config.borderColor}`}>
        <div className="flex items-center gap-4">
          {/* FIX: Use the derived classification to control animation. */}
          <span className={`${config.textColor} ${classification === 'REAL' ? 'animate-pulse-icon' : ''}`}>
            {config.icon}
          </span>
          <h2 className={`text-2xl font-bold ${config.textColor}`}>{config.label}</h2>
        </div>
        <div className="mt-4 pl-12 space-y-4">
          <div className="opacity-0 animate-slide-fade-in">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{t.reasoning}</h3>
            {/* FIX: Use result.explanation instead of result.reasoning. */}
            <p className="text-gray-700 dark:text-gray-300 mt-1">{result.explanation}</p>
          </div>
          
          {/* FIX: Removed topic and keywords sections as they are not available in FactCheckResult. */}
        </div>

        {result.sources && result.sources.length > 0 && (
          <div className="mt-6 border-t border-gray-300 dark:border-gray-700/50 pt-4 opacity-0 animate-slide-fade-in animation-delay-450">
             <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 text-lg mb-3 pl-1">
               <LinkIcon className="w-5 h-5" />
               {t.sources}
             </h3>
             <ul className="list-none space-y-2 pl-4">
               {result.sources.map((source, index) => (
                 <li key={index} className="flex items-start">
                   <span className="text-cyan-500 dark:text-cyan-400 mr-3 mt-1">&#8227;</span>
                   <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
                      title={`Opens new tab: ${source.uri}`}
                   >
                     <span>{source.title}</span>
                     <ExternalLinkIcon className="w-4 h-4 flex-shrink-0" />
                   </a>
                 </li>
               ))}
             </ul>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleShare}
            disabled={shareStatus !== 'idle'}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200/80 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300/80 dark:hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
            aria-label="Share analysis result"
          >
            <ShareIcon className="w-5 h-5" />
            <span>{getShareButtonText()}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultDisplay;
