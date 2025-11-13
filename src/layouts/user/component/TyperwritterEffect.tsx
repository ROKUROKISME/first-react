import React, { useState, useEffect } from "react";

const TypewriterLoop: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Logika Utama Efek Mesin Ketik
  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Mode Menghapus (Backspace)
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        setTypingSpeed(75); // Kecepatan hapus lebih cepat
      } else {
        // Mode Mengetik
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        setTypingSpeed(150); // Kecepatan ketik normal
      }
    };

    // Panggil fungsi typing pada interval tertentu
    const timer = setTimeout(handleTyping, typingSpeed);

    // Cleanup timer saat komponen di-unmount atau status berubah
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases, typingSpeed]);

  // Logika Transisi Antar Frasa (Kapan harus mulai menghapus atau pindah frasa)
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    // Jika selesai mengetik satu frasa
    if (!isDeleting && displayedText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), 2000); // Tunggu 1.5 detik sebelum menghapus
    }
    // Jika selesai menghapus
    else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length); // Pindah ke frasa berikutnya (looping)
    }
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  // Styling kursor (menggunakan Tailwind untuk animasi opacity)
  const cursorClasses = `
    inline-block ml-1 w-1 bg-gray-800 
    animate-pulse /* Menggunakan animasi pulse bawaan Tailwind untuk kedipan */
  `;

  return (
    <div className="flex items-center justify-center font-mono text-3xl font-bold">
      <span>{displayedText}</span>
      <span className={cursorClasses}></span>
    </div>
  );
};

export default TypewriterLoop;
