

// get cars in garage

export async function getGarage() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/garage`, {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${token}`,
            }

        });
        if (!res.ok) throw new Error("خطا في جلب البيانات ");

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}