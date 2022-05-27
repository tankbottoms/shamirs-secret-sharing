shamirs-secret-sharing typescript implementation
======================

A simple implementation of Shamir's Secret Sharing configured to use a finite field in GF(2^8) with 128 bit padding.

TypeScript variant of https://github.com/jwerle/shamirs-secret-sharing based on version 1.0.1

### example usage

```typescript
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

```

example output

```bash 
  secret: vehicle nasty wrist siege head balcony boring economy cloud stone peace merry hospital cliff dinosaur walnut cat solar diesel horse honey end live gate
  total_shares: 24
  threshold: 11
  random position: 13


  recovered secret: vehicle nasty wrist siege head balcony boring economy cloud stone peace merry hospital cliff dinosaur walnut cat solar diesel horse honey end live gate
```


## preface

Ported from or directly influenced by
[secrets.js](https://github.com/grempe/secrets.js),
[c-sss](https://github.com/fletcher/c-sss), and
[libgfshare](https://launchpad.net/libgfshare)

### `shares = split(secret, opts)`

Generate a set of unique and distinct shares for a secret with a configured threshold.

* `secret` (**required**) - A `Buffer` instance or `string` that represents a
  secret for which shares are created for
* `opts` (**required**) - An object of options for configuring how
  shares are created for a secret
  * `opts.shares` (**required**) - The number of `n` shares that should
    be created for this secret
  * `opts.threshold` (**required**) - The number of `t` of `n` distinct share
    that are required to reconstruct this secret
  * `opts.random` (*optional*) - An optional _Pseudorandom number
    generator_ (PRNG) function that should generate a random value
    buffer based on some input. e.g `opts.random = (size) =>
    randomBytes(size)`

### `secret = combine(shares)`

Reconstruct a secret from a distinct set of shares. This function _will not_ throw an error for incorrect shares or if `p(0)` is not the correct secret for the given shares.

* `shares` (**required**) - An array of shares, that is an array of
  equally sized and distinct `Buffer` instances, or _strings_

## see also

* https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing
* https://en.wikipedia.org/wiki/Secret_sharing
* https://en.wikipedia.org/wiki/Lagrange_polynomial
* https://en.wikipedia.org/wiki/Horner%27s_method
* https://en.wikipedia.org/wiki/Pseudorandom_number_generator
* https://codesandbox.io/s/shamirs-secret-sharing-pcsbk

