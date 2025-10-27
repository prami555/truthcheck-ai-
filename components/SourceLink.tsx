
import React from 'react';
import type { Source } from '../types';

interface SourceLinkProps {
    source: Source;
}

const LinkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
);


export const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(source.uri).hostname}&sz=32`;

    return (
        <li className="bg-slate-900/70 border border-slate-700 rounded-lg transition-all duration-200 hover:border-blue-500 hover:bg-slate-800">
            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3">
                <img
                    src={faviconUrl}
                    alt="favicon"
                    className="w-6 h-6 flex-shrink-0 rounded-sm"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if(parent) {
                            const linkIcon = parent.querySelector('.link-icon');
                            if(linkIcon) linkIcon.classList.remove('hidden');
                        }
                    }}
                />
                <LinkIcon className="link-icon w-6 h-6 flex-shrink-0 rounded-sm text-slate-500 hidden"/>
                <div className="flex-grow min-w-0">
                    <p className="font-medium text-slate-200 truncate">{source.title}</p>
                    <p className="text-sm text-slate-500 truncate">{source.uri}</p>
                </div>
            </a>
        </li>
    );
};
