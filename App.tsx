import React, { useState, useCallback, useEffect } from 'react';
import { getFactCheck } from './services/geminiService';
import type { FactCheckResult, Source, Verdict } from './types';
import { LoadingSpinner } from './components/LoadingSpinner';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import ExamplePrompts from './components/ExamplePrompts';
import ResultDisplay from './components/ResultDisplay';
import { translations } from './utils/translations';

// A simple URL regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const App: React.FC = () => {
    const [statement, setStatement] = useState<string>('');
    const [result, setResult] = useState<FactCheckResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isUrl, setIsUrl] = useState<boolean>(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const t = translations.en; // Using English translations by default

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleStatementChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setStatement(text);
        setIsUrl(URL_REGEX.test(text.trim()));
    };

    const handleExampleClick = (text: string) => {
        setStatement(text);
        setIsUrl(false);
    };

    const parseResponse = (responseText: string, groundingChunks: any[]): FactCheckResult => {
        const lines = responseText.trim().split('\n');
        const verdict = lines.shift() as Verdict;
        const explanation = lines.join('\n').trim();

        const validVerdicts: Verdict[] = ['True', 'False', 'Misleading', 'Partially True', 'Unverifiable'];
        if (!validVerdicts.includes(verdict)) {
            throw new Error("Received an invalid verdict from the AI. Please try rephrasing your statement.");
        }

        const sources: Source[] = groundingChunks
            .map(chunk => chunk.web)
            .filter(web => web && web.uri && web.title)
            .map(web => ({ uri: web.uri, title: web.title }))
            .filter((source, index, self) => 
                index === self.findIndex((s) => s.uri === source.uri)
            );
            
        return { verdict, explanation, sources };
    };

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!statement.trim() || isLoading || isUrl) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await getFactCheck(statement);
            const responseText = response.text;
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            
            if (!responseText) {
                throw new Error("The AI returned an empty response. Please try again.");
            }
            
            const parsedResult = parseResponse(responseText, groundingChunks);
            setResult(parsedResult);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [statement, isLoading, isUrl]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header t={t} />
                
                <main>
                    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm mt-8">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="statement" className="sr-only">
                                {t.textareaPlaceholder}
                            </label>
                            <textarea
                                id="statement"
                                value={statement}
                                onChange={handleStatementChange}
                                placeholder={t.textareaPlaceholder}
                                className="w-full h-40 p-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-y text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-lg"
                                disabled={isLoading}
                                aria-invalid={isUrl}
                                aria-describedby={isUrl ? "url-error" : undefined}
                            />
                            {isUrl && (
                                <div id="url-error" className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-400/50 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm">
                                    <h4 className="font-bold">{t.urlMessageTitle}</h4>
                                    <p>{t.urlMessageBody}</p>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading || !statement.trim() || isUrl}
                                className="mt-4 w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner />
                                        {t.analyzingButton}
                                    </>
                                ) : (
                                    t.checkButton
                                )}
                            </button>
                        </form>
                    </div>

                    {!result && <ExamplePrompts onExampleClick={handleExampleClick} t={t} />}

                    <div className="mt-8">
                        {error && (
                            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 p-4 rounded-lg shadow-lg" role="alert">
                                <p className="font-semibold">{t.errorTitle}</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {result && <ResultDisplay result={result} t={t} />}
                    </div>
                </main>

                <footer className="w-full text-center text-gray-500 dark:text-gray-400 mt-12 text-sm">
                    <p>{t.footerText}</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
