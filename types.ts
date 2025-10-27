
export type Verdict = 'True' | 'False' | 'Misleading' | 'Partially True' | 'Unverifiable';

export interface Source {
  uri: string;
  title: string;
}

export interface FactCheckResult {
  verdict: Verdict;
  explanation: string;
  sources: Source[];
}
