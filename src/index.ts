import { combine } from "./combine";
import { split } from "./split";

/* generate 24 seed phrase from https://iancoleman.io/bip39/ */
const utf8_source =
    "vehicle nasty wrist siege head balcony boring economy cloud stone peace merry hospital cliff dinosaur walnut cat solar diesel horse honey end live gate";
const secret = Buffer.from(utf8_source);

const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const total_shares = getRandomIntInclusive(0, utf8_source.split(` `).length);
const threshold = Math.floor(total_shares / 2) - 1;
const shares = split(secret, { shares: total_shares, threshold: threshold });

const rnd_position = getRandomIntInclusive(0, shares.length - threshold);

console.log(`
  secret: ${secret}
  total_shares: ${total_shares}
  threshold: ${threshold}
  random position: ${rnd_position}
`);

const recovered = combine(shares.slice(rnd_position, rnd_position + threshold));

console.log(`
  recovered secret: ${recovered.toString()}
`);

// export { combine, split };
