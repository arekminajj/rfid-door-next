import Link from "next/link";

async function getUsers() {
    const res = await fetch(
        "https://rfid-door-api-db3514e2b4df.herokuapp.com/user/all"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const users = await getUsers();

    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <Link href={"" + user.id}>{user.name}</Link>
                    </div>
                );
            })}
        </div>
    );
}
