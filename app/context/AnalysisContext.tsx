"use client";
import { useContext, createContext, useState } from "react";

type DiagnosisResult = {
  confidence: number;
  prediction: string;
  recommendation: string;
};

interface AnalysisContextValue {
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  analysisResult: DiagnosisResult | null;
  setAnalysisResult: (result: DiagnosisResult | null) => void;
}

const AnalysisContext = createContext<AnalysisContextValue | undefined>(
  undefined
);

function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnosisResult | null>(
    null
  );

  return (
    <AnalysisContext.Provider
      value={{ isAnalyzing, setIsAnalyzing, analysisResult, setAnalysisResult }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}

export { AnalysisProvider, useAnalysis };
