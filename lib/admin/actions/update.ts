export async function updateBook(bookId: string, data: { soldPrice: number; isSold: boolean }) {
  try {
    const res = await fetch(`/api/price/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Update failed");
    }

    const result = await res.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false };
  }
}
