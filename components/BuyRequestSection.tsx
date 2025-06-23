"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface BuyRequestSectionProps {
    userId: string;
    bookId: string;
    title: string;
    price: number;
    coverUrl: string;
    vintedNickname: string | null;
}

const BuyRequestSection = ({
    userId,
    bookId,
    title,
    price,
    coverUrl,
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
                onClick={() => setShowForm(!showForm)}
                className="h-20 w-50 px-10 flex items-center gap-3"
            >
                {showForm ? "Ukryj formularz" : "Buy Request"}
            </Button>

            {showForm && (
                <div className="w-full max-w-[700px] mx-auto mt-10 bg-white border border-gray-300 rounded-xl shadow-2xl p-8 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        🧾 Prośba o zakup
                    </h3>

                    <div className="space-y-2 text-base">
                        <p><span className="font-semibold">📖 Tytuł:</span> {title}</p>
                        <p><span className="font-semibold">💰 Cena:</span> {price} zł</p>
                        <p><span className="font-semibold">👤 Twój nick na Vinted:</span> {vintedNickname ?? "brak"}</p>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                            Wyślij prośbę
                        </Button>
                        <Button onClick={() => setShowForm(false)} variant="outline">
                            Anuluj
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BuyRequestSection;
