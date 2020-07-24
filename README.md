# moment-utl

Moment.js utilities.

[![NPM](https://img.shields.io/npm/v/moment-utl.svg)](https://www.npmjs.com/package/moment-utl)

## Installation

```bash
npm install --save moment-utl
```

Install peer dependencies:

```bash
npm install --save moment
```

## Usage

### API

- [allSupportedLocales][1]
- [allSupportedLocalesMap][2]
- [defaultFallbackLocale][14]
- [firstDateOfCurrentMonth][16]
  - [Parameters](#firstdateofcurrentmonth-parameters)
- [getWeekDays][17]
  - [Parameters](#getweekdays-parameters)
- [getWeekRange][18]
  - [Parameters](#getweekrange-parameters)
- [importLocale][3]
  - [Parameters](#importlocales-parameters)
- [toMomentLocale][5]
  - [Parameters](#tomomentlocale-parameters)

## allSupportedLocales

Returns all the supported locales by Moment, without the need
to having them being loaded into Moment.

Returns **[Array][7]&lt;[string][8]>**
An array of all the supported locales where each value is a string
identifying a locale.

```js
import { allSupportedLocales } from "moment-utl";

const locales = allSupportedLocales();
// locales = ["af", "ar", "ar-dz", "ar-kw", "ar-ly", ... , "zh-hk", "zh-tw"]
```

**NOTE**: `allSupportedLocales()` generates an array of locales using a pre-bundled `res/locales.js` file which comes with `moment-utl` (`node_modules/moment-utl/res/locales.js`).

This file is generated whenever `moment-utl` is built and before a new version of it is published to NPM using a `moment` dev dependency, which may be of a different version than the `moment` package you install alongside with `moment-utl` in your project.

If you are using ES6 and you want to be sure that this `res/locales.js` file stays up to date with your version of `moment`, see the [Keeping the res/locales.js file up to date with your moment installation][11] section below.

Back to [API][15].

## allSupportedLocalesMap

Returns a map of all the supported locales by Moment, without the need
to having them being loaded into Moment.

Returns **[Object][9]**
An object where each key is a string identifying a locale
and the corresponding value is a unique int identifying the locale
starting from 1.

```js
import { allSupportedLocalesMap } from "moment-utl";

const localesMap = allSupportedLocalesMap();
// localesMap = { "af": 1, "ar": 2, "ar-dz": 3, "ar-kw": 4, "ar-ly": 5, ... , "zh-tw": 128 }
```

**NOTE**: `allSupportedLocalesMap()` generates a map of locales using a pre-bundled `res/locales.js` file which comes with `moment-utl` (`node_modules/moment-utl/res/locales.js`).

This file is generated whenever `moment-utl` is built and before a new version of it is published to NPM using a `moment` dev dependency, which may be of a different version than the `moment` package you install alongside with `moment-utl` in your project.

If you are using ES6 and you want to be sure that this `res/locales.js` file stays up to date with your version of `moment`, see the [Keeping the res/locales.js file up to date with your moment installation][11] section below.

Back to [API][15].

## defaultFallbackLocale

Returns the default fallback locale.
This will be USA's English, i.e. "en".

Returns **[string][8]** The default fallback locale.

```js
import { defaultFallbackLocale } from "moment-utl";

const locale = defaultFallbackLocale();
// locale = "en"
```

Back to [API][15].

## firstDateOfCurrentMonth

Returns the first date of the current month.

### <a id="firstdateofcurrentmonth-parameters" name="firstdateofcurrentmonth-parameters">Parameters</a>

- `format` **([string][8])** (_optional_, default `"YYYY-MM-DD"`)<br/>The format string for the date.

Returns **[string][8]** The first date of the current month.

```js
import { firstDateOfCurrentMonth } from "moment-utl";

const date = firstDateOfCurrentMonth();
// Assuming that the current month is June 2020, then date = "2020-06-01"
```

Back to [API][15].

## getWeekDays

Returns the days of the week in which a given date or today's date falls in.

### <a id="getweekdays-parameters" name="getweekdays-parameters">Parameters</a>

- `date` **(Moment | [Date][19] | [string][8] | [number][20] | [undefined][21])** (_optional_, default `undefined`)<br/>The date to use for which to return the days of the week in which the date falls in. If not given, today's date is assumed.

Returns **[Array][7]&lt;[Date][19]>** The days of the week.

```js
import { getWeekDays } from "moment-utl";

const weekDays = getWeekDays("2020-07-14");
/*
 * weekDays will contain instances of Date:
 *
 * weekDays = [
 *   Sun Jul 12 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-12")
 *   Mon Jul 13 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-13")
 *   Tue Jul 14 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-14")
 *   Wed Jul 15 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-15")
 *   Thu Jul 16 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-16")
 *   Fri Jul 17 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-17")
 *   Sat Jul 18 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-18")
 * ]
 */
```

Back to [API][15].

## getWeekRange

Returns the range of the week in which a given date or today's date falls in.

### <a id="getweekrange-parameters" name="getweekrange-parameters">Parameters</a>

- `date` **(Moment | [Date][19] | [string][8] | [number][20] | [undefined][21])** (_optional_, default `undefined`)<br/>The date to use for which to return the range of the week in which the date falls in. If not given, today's date is assumed.

Returns **[Array][7]&lt;[Date][19]>** An object with two properties: `from` containing the initial day of the week (`Date` instance) and `to` containing the final day of the week (`Date` instance).

```js
import { getWeekRange } from "moment-utl";

const weekRange = getWeekRange("2020-07-14");
/*
 * weekRange will contain instances of Date:
 *
 * weekRange = {
 *   from: Sun Jul 12 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-12")
 *   to: Sat Jul 18 2020 00:00:00 GMT+0200 (Central European Summer Time) {}, // new Date("2020-07-18")
 * }
 */
```

Back to [API][15].

## importLocale

Imports a Moment locale asynchronously (using dynamic imports).

### <a id="importlocales-parameters" name="importlocales-parameters">Parameters</a>

- `locale` **([string][8] | any)** The locale to import. A value which is not a string may be passed and it will be normalized to an empty string which will be treated as an unknown locale resolving to the Moment's default locale (USA's English, i.e. "en").

- `unknownLocaleCallback` **(normalizedLocale: string, locale: string|\*) => \*** (_optional_, default `undefined`)<br/>A callback called with the Moment's default locale (USA's English, i.e. "en") if the given locale is unknown as its first parameter and the given locale as the second parameter.
  This callback will be called only when the given locale is not a locale
  known to Moment and it's not the Moment's default locale (USA's English, i.e. "en").
  If a locale is unknown, the callback is called before resolving the returned promise and the promise will resolve with the Moment's default locale (USA's English, i.e. "en").

Returns **[Promise][10]** A promise which, if fulfilled, resolves with the normalized locale when the given locale has been imported
successfully or rejects with the error if the given locale cannot be imported
(e.g. the locale chunk filename is not found or there is a network error).
If the locale is unknown, then the returned promise doesn't reject.

Example 1:

```js
import { importLocale } from "moment-utl";
import moment from "moment"; // Note that you don't need to import moment explicitly to use "importLocale".

const locale = "ar";
importLocale(locale).then((normalizedLocale) => {
  moment.locale(normalizedLocale);
  console.log(moment().format("LLLL")); // الإثنين ٢٠ أبريل ٢٠٢٠ ١٨:٤٠
});
```

Example 2:

```js
import { importLocale } from "moment-utl";
import moment from "moment";

async function changeLocale(locale, unknownLocaleCallback = void 0) {
  // Load a locale on-demand.
  //
  // Thanks to "importLocale", you don't need to statically import
  // all the locales required by your app in your entry point:
  //
  // import "moment/locale/zh-tw";
  // import "moment/locale/de";
  // import 'moment/locale/ru';
  // import 'moment/locale/it';
  // import 'moment/locale/en-gb';
  // ...
  //
  // "importLocale" normalizes the given locale,
  // e.g. if you pass it "zh_TW", "zH-Tw", they will all be normalized to "zh-tw".
  //
  // If the given locale is unknown (see Example 3 below),
  // then "importLocale" will resolve with "en", the default Moment locale,
  // i.e. American English (moment-utl assumes "en" is "en-US").
  //
  // If the given locale is unknown and "unknownLocaleCallback" is a function,
  // it will be called before importLocale resolves (see Example 3 below).
  const normalizedLocale = await importLocale(locale, unknownLocaleCallback);
  moment.locale(normalizedLocale);
}

changeLocale("zh_TW").then(() => {
  console.log(moment().format("LLLL")); // 2020年4月20日星期一 18:40
});

// ...

// Later on, you can change the locale again.
changeLocale("ru").then(() => {
  console.log(moment().format("LLLL")); // понедельник, 20 апреля 2020 г., 18:41
});

// And so on...
changeLocale("en-GB").then(() => {
  console.log(moment().format("LLLL")); // Monday, 20 April 2020 18:42
});
```

Example 3:

```js
import { importLocale } from "moment-utl";
import moment from "moment";

// If the given locale is unknown, then "unknownLocaleCallback" will be called
// before the promise resolves and "importLocale" will resolve with "normalizedLocale"
// set to "en".
const unknownLocaleCallback = (normalizedLocale, locale) => {
  console.log(
    `The locale "${locale}" is unknown. importLocale will resolve with "${normalizedLocale}"`
  );
};
importLocale("unknown-locale", unknownLocaleCallback).then(
  (normalizedLocale) => {
    moment.locale(normalizedLocale);
    console.log(`Normalized locale: ${normalizedLocale}`); // en
    console.log(moment().format("LLLL")); // Monday, April 20, 2020 7:11 PM
  }
);

// Same if locale is not a string:
const locale = void 0;
importLocale(locale, unknownLocaleCallback).then((normalizedLocale) => {
  moment.locale(normalizedLocale);
  console.log(`Normalized locale: ${normalizedLocale}`); // en
  console.log(moment().format("LLLL")); // Monday, April 20, 2020 7:11 PM
});

// Will output, in order:
// The locale "unknown-locale" is unknown. importLocale will resolve with "en"
// The locale "undefined" is unknown. importLocale will resolve with "en"
// Normalized locale: en
// Saturday, April 25, 2020 11:12 AM
// Normalized locale: en
// Saturday, April 25, 2020 11:12 AM
```

**NOTE**: A locale is considered to be _unknown_ if the array returned by `allSupportedLocales()` doesn't contain it. `en` is a valid locale and is assumed to refer to `en-US`, i.e. American English (Moment's default locale).

Back to [API][15].

## toMomentLocale

Converts a string representing a locale to a Moment locale.

This function reformats an incoming locale (e.g. "ar_KW" to "ar-kw")
checking if it's supported by Moment and falling back to language code only (e.g. "ar"),
then falling back to the Moment's default locale (USA's English, i.e. "en").

### <a id="tomomentlocale-parameters" name="tomomentlocale-parameters">Parameters</a>

- `locale` **([string][8] | any)** A string representing a locale. A value which is not a string may be passed and it will be normalized to an empty string and the returned locale will be the Moment's default locale (USA's English, i.e. "en").

Returns **[Array][7]** A tuple where the first element is a string containing the normalized
Moment locale for the given "locale" parameter and the second element
is a boolean indicating whether the locale is known or not
(if "true", the given locale is known and was looked up; if "false",
it means that the given locale was not looked up and is unknown).
When the given locale is unknown, the returned array will contain
the Moment's default locale as its first element (USA's English, i.e. "en").

```js
import { toMomentLocale } from "moment-utl";
let [normalizedLocale, isKnown] = toMomentLocale("ar_KW"); // Known locale.
console.log(normalizedLocale, isKnown); // ar-kw true

[normalizedLocale, isKnown] = toMomentLocale("blah-blah"); // Unknown locale.
console.log(normalizedLocale, isKnown); // en false

[normalizedLocale, isKnown] = toMomentLocale(null); // Unknown locale.
console.log(normalizedLocale, isKnown); // en false
```

Back to [API][15].

## Keeping the res/locales.js file up to date with your moment installation

**NOTE**: This will work only if you are using ES6. It will not work if you are using the `moment-utl`'s build (`node_modules/moment-utl/dist/moment-utl.js` or `node_modules/moment-utl/dist/moment-utl.min.js`).

`moment-utl` uses a `res/locales.js` file which bundles all the locales supported by moment. This file is used by [allSupportedLocales][1] and [allSupportedLocalesMap][2] and is generated when building `moment-utl` using a dev dependency of `moment`.
This version of `moment` may be different than the version of `moment` you install when you run `npm install --save moment moment-utl` in your project. Also, your `moment` may update when you run `npm update`.
Therefore, you may end up using a `moment` supporting a new locale which is not returned by [allSupportedLocales][1] and [allSupportedLocalesMap][2].

To fix this, `moment-utl` exposes a script called `moment-utl-locales` which you can run with `npx moment-utl-locales` or `./node_modules/.bin/moment-utl-locales` as part of your build steps **before** you transpile and bundle your code with Webpack, Rollup or whatever you are using.

You can run this command on your terminal with:

```
$ npx moment-utl-locales
```

Or:

```
$ ./node_modules/.bin/moment-utl-locales
```

**NOTE**: If you don't have `npx`, you can install it with `npm install -g npx` .

`npx moment-utl-locales` just recreates the `node_modules/moment-utl/res/locales.js` file using the `moment` package you have installed in your project, which is the one `moment-utl` peer depends on and which was installed by you with `npm install --save moment moment-utl`.

You can run this script as part of your build process, e.g. in `package.json`:

```js
{
  ...
  "scripts": {
    ...
    "build": "npm run build-locales && npm run build-webpack",
    "build-locales": "npx moment-utl-locales",
    "build-webpack": "WEBPACK_ENV=build webpack",
    ...
  }
  ...
}
```

Just make sure you run `moment-utl-locales` **before** bundling your code with your module bundler.
You can also see this [comment][12] in this [issue #1][13].

Back to [API][15].

[1]: #allsupportedlocales
[2]: #allsupportedlocalesmap
[3]: #importlocale
[5]: #tomomentlocale
[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
[10]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
[11]: #keeping-the-reslocalesjs-file-up-to-date-with-your-moment-installation
[12]: https://github.com/tonix-tuft/moment-utl/issues/1#issuecomment-616088826
[13]: https://github.com/tonix-tuft/moment-utl/issues/1
[14]: #defaultfallbacklocale
[15]: #api
[16]: #firstdateofcurrentmonth
[17]: #getweekdays
[18]: #getweekrange
[19]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[20]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[21]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

## License

MIT © [Anton Bagdatyev (Tonix)](https://github.com/tonix-tuft)
