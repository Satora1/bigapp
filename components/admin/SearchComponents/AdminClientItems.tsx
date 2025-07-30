"use client";

import React, { useState } from "react";
import InputAdmin from "../InputAdmin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ImageForAdmin from "@/components/ImageForAdmin";
import UpdateSoldForm from "@/app/admin/forms/PriceForm";

interface AdminBooksClientProps {
  items: Book[];
}

const AdminBooksClient = ({ items }: AdminBooksClientProps) => {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold flex-1 min-w-[200px]">📚 Wszystkie pozycje</h2>
        <div className="flex gap-3 items-center ml-auto">
          <InputAdmin search={search} onSearchChange={setSearch} />
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Utwórz nową pozycję
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-start gap-4 p-5 rounded-xl shadow-sm border transition-all duration-300 w-full ${item.isSold ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
          >

            <div className="w-full md:w-32 h-32 overflow-hidden rounded-md border">
              <ImageForAdmin coverImage={item.coverUrl} />
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-sm text-gray-500">ID: {item.id}</p>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm">
                <span className="font-medium">💵 Cena:</span> {item.price} zł
              </p>
              <p className="text-sm">
                <span className="font-medium">📦 Sprzedane:</span>{" "}
                {item.isSold ? "Tak" : "Nie"}
              </p>
            </div>

            <div className="md:ml-auto ">
              <UpdateSoldForm
                bookId={item.id}
                defaultValues={{
                  soldPrice: item.soldPrice ?? 0,
                  isSold: item.isSold ?? false,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminBooksClient;
