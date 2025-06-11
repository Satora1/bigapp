"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import buyRequests from "@/lib/actions/buyRequest";

interface BuyProps {
  userId: string;
  bookId: string;
  coverUrl: string;
  vintedNickname: string; // Dodano opcjonalny vintedNickname
}

const Buy: React.FC<BuyProps> = ({ userId, bookId, coverUrl,vintedNickname }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const HandleBuy = async () => {
    try {
      await buyRequests({ userId, bookId, coverUrl,vintedNickname });
      setIsFavorite(true);

      // Odświeżenie strony (np. by pobrać dane na nowo)
      router.refresh();
    } catch (error) {
      console.error("Error adding to buy:", error);
    }
  };

  return (
    <Button
      onClick={HandleBuy}
      className="cursor-pointer h-20 w-25 "
      disabled={isFavorite}
    >
      <div className='flex flex-row items-center justify-center mr-5'>
        <span className="text-base text-xl">
          {isFavorite ? "Already requested" : "Buy request"}
        </span>
  

      </div>

    </Button>
  );
};

export default Buy;
