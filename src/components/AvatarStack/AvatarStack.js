import { usePresence } from "@ably-labs/react-hooks";

const names = [
  "Caneleyr",
  "Ceshariv",
  "Chaen",
  "Cheth",
  "Eminial",
  "Facan",
  "Haeran",
  "Lankaur",
  "Maus",
  "Meyr",
  "Pelari",
  "Belix",
  "Brir",
  "Ciavi",
  "Cindali",
  "Danari",
  "Dandiau",
  "Dara",
  "Daveyni",
  "Edda",
  "Elian",
  "Eliana",
  "Evelosana",
  "Fana",
  "Fauane",
  "Ferza",
  "Garesk",
  "Hanthu",
  "Hars",
  "Hasolar",
  "Hauri",
  "Helia",
  "Heyki",
  "Irga",
  "Jacaden",
  "Jax",
  "Kalonen",
  "Kynara",
  "Lenax",
  "Llanos",
  "Lorro",
  "Lushani",
  "Manc",
  "Mongar",
  "Mykeron",
  "Neronir",
  "Olazar",
  "Orori",
  "Pela",
  "Ranen",
  "Rorich",
  "Sarin",
  "Serian",
  "Shero",
  "Sinolax",
  "Solia",
  "Sorin",
  "Stenera",
  "Svari",
  "Teutani",
  "Thogar",
  "Zaal",
  "Terix",
  "Acanos",
  "Adarore",
  "Alar",
  "Alasar",
  "Aloria",
  "Amarid",
  "Ambeya",
  "Amendi",
  "Ampeto",
  "Ancar",
  "Arel",
  "Auseri",
  "Avala",
  "Aven",
  "Baen",
  "Balas",
  "Balog",
  "Balt",
  "Banill",
  "Barbarto",
  "Barro",
  "Baynar",
  "Beniko",
  "Betton",
  "Beust",
  "Bogdan",
  "Bolegro",
  "Boneas",
  "Calari",
  "Caminis",
  "Caniso",
  "Canseri",
  "Carst",
  "Carth",
  "Cashar",
  "Cass"
];

export function AvatarStack() {
  const [presenceData] = usePresence("playground", {
    name: names[Math.floor(Math.random() * names.length)]
  });
  return (
      <ul>
        {presenceData.slice(0, 3).map((msg, index) => (
          <li key={index}>
            Initial: {msg.data.name.charAt(0)},
            <span>Name: {msg.data.name}</span>
          </li>
        ))}
        {presenceData.length > 3 && (
          <li>+{presenceData.length - 3}</li>
        )}
      </ul>
  );
};