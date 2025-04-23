import Header from "./components/Header";
import ImageDropzone from "./components/ImageDropzone";

// I'd build everything here, optimizing for speed and with time, I'd then split the code into components
export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-[clamp(1.5rem,4vw+1rem,4.5rem)] font-medium text-center mt-[clamp(2rem,8vh,13vh)] font-[family-name:var(--font-eb-garamond)]">
          {/* Understand your skin better with AI */}
          Gain insight into your skin
        </h1>
        <p className="md:max-w-[64vw] text-center text-base-content/70 mt-6 font-[family-name:var(--font-work-sans)] mx-auto">
          Upload a photo of your skin, and our AI will analyze it to identify
          any conditions. You'll receive a detailed report along with
          recommendations for treatments and medications.
        </p>

        <ImageDropzone />
      </main>
    </>
  );
}
