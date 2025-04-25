"use client";

import { useAnalysis } from "../context/AnalysisContext";

export default function DiagnosisCard() {
  const { isAnalyzing, analysisResult } = useAnalysis(); // Assuming you have a context or state management for this

  return (
    <div
      className={`max-w-[740px] w-full mx-auto mb-10 border-10 border-base-300 rounded-3xl ${
        isAnalyzing || analysisResult ? "block" : "hidden"
      }`}
    >
      <div className="border-2 rounded-box border-neutral/60 p-6 flex flex-col gap-y-3 divide-y divide-base-300 font-[family-name:var(--font-work-sans)]">
        <h2 className="text-2xl font-semibold text-center text-base-content pb-6 font-[family-name:var(--font-eb-garamond)]">
          Diagnosis Result
        </h2>

        <div className="block space-y-1/2 pb-3">
          <h3 className="font-medium text-lg text-secondary">Confidence</h3>

          {analysisResult ? (
            <p className="text-4xl font-medium text-success">
              {(Number(analysisResult.confidence) * 100).toFixed(1)}%
            </p>
          ) : (
            <div className="skeleton size-9 rounded-md" />
          )}
        </div>

        <div className="block space-y-1/2 pb-3">
          <h3 className="font-medium text-lg text-secondary">Prediction</h3>

          {analysisResult ? (
            <p className="text-4xl font-medium text-success">
              {analysisResult.prediction}
            </p>
          ) : (
            <div className="skeleton h-9 w-20 rounded-md" />
          )}
        </div>

        <div className="block space-y-1/2">
          <h3 className="font-medium text-lg text-secondary">Recommendation</h3>

          {analysisResult ? (
            <p className="text-base font-normal text-primary">
              {analysisResult.recommendation}
            </p>
          ) : (
            <div className="skeleton h-9 w-20 rounded-md" />
          )}
        </div>
      </div>
    </div>
  );
}
