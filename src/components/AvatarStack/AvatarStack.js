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

const randomColor = (() => {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    return () => {
        var h = randomInt(120, 220);
        var s = randomInt(56, 72);
        var l = randomInt(40, 60);
        return `hsl(${h},${s}%,${l}%)`;
    };
})();

export function AvatarStack() {
    const [presenceData] = usePresence("playground", {
    name: names[Math.floor(Math.random() * names.length)]
  });
  return (
    <ul className="flex -space-x-2">
        {presenceData.slice(0, 3).map((msg, index) => (
            <li key={index} className="group bg-slate-200 h-12 w-12 rounded-full flex items-center justify-center ring-2 ring-white relative" style={{backgroundColor: randomColor()}}>
                {msg.data.name.charAt(0)}
                <span className="absolute top-[56px] invisible group-hover:visible rounded bg-black text-white px-2 py-1">{msg.data.name}</span>
            </li>
        ))}
        {presenceData.length > 3 && (
            <li className="bg-slate-200 h-12 w-12 rounded-full flex items-center justify-center ring-2 ring-white z-50">
                +{presenceData.length - 3}
            </li>
         )}
     </ul>
    );
};