
import React from 'react';
import type { Verdict } from '../types';

interface VerdictBadgeProps {
    verdict: Verdict;
}

const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
const XCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
const ExclamationTriangleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);
const QuestionMarkCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
);


const verdictStyles: Record<Verdict, {
    bgColor: string;
    textColor: string;
    Icon: React.FC<{className?: string}>;
}> = {
    'True': {
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-400',
        Icon: CheckCircleIcon,
    },
    'False': {
        bgColor: 'bg-red-500/10',
        textColor: 'text-red-400',
        Icon: XCircleIcon,
    },
    'Misleading': {
        bgColor: 'bg-yellow-500/10',
        textColor: 'text-yellow-400',
        Icon: ExclamationTriangleIcon,
    },
    'Partially True': {
        bgColor: 'bg-cyan-500/10',
        textColor: 'text-cyan-400',
        Icon: ExclamationTriangleIcon,
    },
    'Unverifiable': {
        bgColor: 'bg-slate-500/10',
        textColor: 'text-slate-400',
        Icon: QuestionMarkCircleIcon,
    },
};

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict }) => {
    const { bgColor, textColor, Icon } = verdictStyles[verdict] || verdictStyles['Unverifiable'];

    return (
        <div className={`inline-flex items-center gap-x-2 rounded-full px-4 py-2 text-lg font-bold ${bgColor} ${textColor}`}>
            <Icon className="h-6 w-6" />
            <span>{verdict}</span>
        </div>
    );
};
