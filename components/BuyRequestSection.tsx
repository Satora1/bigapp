"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface BuyRequestSectionProps {
  title: string;
  price: number;
  vintedNickname: string | null;
}

const BuyRequestSection = ({
  title,
  price,
  vintedNickname,
}: BuyRequestSectionProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    alert("Prośba została wysłana!");
    setShowForm(false);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Button
        onClick={() => setShowForm(true)}
        className="h-20 w-50 px-10 flex items-center gap-3"
      >
        Buy Request
      </Button>

      {showForm && (
        <>
          {/* Ciemne tło */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowForm(false)}
          />

          {/* Modal */}
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-xl shadow-2xl p-8 space-y-6 w-full max-w-3xl">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              🧾 Prośba o zakup
            </h3>

            <div className="space-y-2 text-base">
              <p>
                <span className="font-semibold">📖 Tytuł:</span> {title}
              </p>
              <p>
                <span className="font-semibold">💰 Cena:</span> {price} zł
              </p>
              <p>
                <span className="font-semibold">👤 Twój nick na Vinted:</span>{" "}
                {vintedNickname ?? "brak"}
              </p>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Wyślij prośbę
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Anuluj
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BuyRequestSection;
