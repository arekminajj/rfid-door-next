import Link from "next/link";

async function getEntrances(id) {
    const res = await fetch(
        "https://rfid-door-api-db3514e2b4df.herokuapp.com/door/" + id
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getUser(id) {
    const res = await fetch(
        "https://rfid-door-api-db3514e2b4df.herokuapp.com/user/" + id
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

function parseISODate(isoString) {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    };

    const formatter = new Intl.DateTimeFormat("pl-PL", options);
    const formattedDate = formatter.format(date);

    return formattedDate;
}

export default async function Page({ params }) {
    const entrances = await getEntrances(params.id);
    const entrancesCount = entrances.length;
    const user = await getUser(params.id);

    console.log(entrances);
    return (
        <div>
            <p>Imię i nazwisko: {user.name}</p>
            <p>Liczba wejść: {entrancesCount}</p>

            {entrances.map((entrance) => {
                return (
                    <div key={entrance.id}>
                        <p>{parseISODate(entrance.createDate)}</p>
                    </div>
                );
            })}
        </div>
    );
}
