export async function updateUSer(userId: string, status: string, role: string, data: { status: string; role: string; }) {
  try {
    const res = await fetch(`/api/user/${userId}`, {
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
