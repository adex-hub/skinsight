export default function DiagnosisCard() {
  return (
    <div className="max-w-[740px] w-full mx-auto my-10 border-10 border-base-300 rounded-3xl">
      <div className="border-2 rounded-box border-neutral/60 p-6 flex flex-col gap-y-3 divide-y divide-base-300 font-[family-name:var(--font-work-sans)]">
        <h2 className="text-2xl font-semibold text-center text-base-content pb-6 font-[family-name:var(--font-eb-garamond)]">
          Diagnosis Result
        </h2>

        <div className="block space-y-1/2 pb-3">
          <div className="font-medium text-lg text-secondary">Confidence</div>
          <div className="text-4xl font-medium text-success">99%</div>
        </div>

        <div className="block space-y-1/2 pb-3">
          <div className="font-medium text-lg text-secondary">Prediction</div>
          <div className="text-4xl font-medium text-info">Eczema</div>
        </div>

        <div className="block space-y-1/2">
          <div className="font-medium text-lg text-secondary">
            Recommendation
          </div>
          <div className="text-base font-normal text-primary">
            Use a moisturizer to keep the skin hydrated. Avoid scratching the
            affected area.
          </div>
        </div>
      </div>
    </div>
  );
}
