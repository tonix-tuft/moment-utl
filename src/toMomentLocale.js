/*
 * Copyright (c) 2020 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import allSupportedLocalesMap from "./allSupportedLocalesMap";

/**
 * @type {string}
 */
const NORMALIZED_LOCALE_DESIGNATORS_SEPARATOR = "-";

/**
 * Normalizes a locale.
 *
 * @param {string} locale The locale.
 * @return {string} The normalized locale.
 */
const normalizeLocale = (locale) =>
  locale.replace("_", NORMALIZED_LOCALE_DESIGNATORS_SEPARATOR).toLowerCase();

/**
 * @type {string}
 */
export const DEFAULT_FALLBACK_LOCALE = normalizeLocale("en");

/**
 * Converts a string representing a locale to a Moment locale.
 *
 * This function reformats an incoming locale (e.g. "zh_CN" to "zh-cn")
 * and checks if it's supported by Moment, falling back to language code only (e.g. "zh"),
 * then falling back to the Moment's default locale (USA's English, i.e. "en").
 *
 * @param {string} locale A string representing a locale.
 * @return {Array} A tuple where the first element is a string containing the normalized
 *                 Moment locale for the given "locale" parameter and the second element
 *                 is a boolean indicating whether the locale is known or not
 *                 (if "true", the given locale is known and was looked up; if "false",
 *                 it means that the given locale was not looked up and is unknown).
 *                 When the given locale is unknown, the returned array will contain
 *                 the Moment's default locale as its first element (USA's English, i.e. "en").
 */
export default function toMomentLocale(locale) {
  const normalizedLocale = normalizeLocale(locale);
  const defaultNormalizedLocale = DEFAULT_FALLBACK_LOCALE;
  const localesToTry = [
    normalizedLocale,
    normalizedLocale.split(NORMALIZED_LOCALE_DESIGNATORS_SEPARATOR)[0],
  ];
  const allLocalesMap = {
    ...allSupportedLocalesMap(),
    // Using -1 as values here, but, really, any value which is not "undefined"
    // would be OK in this case, because the value of the map is not used.
    [defaultNormalizedLocale]: -1,
    [defaultNormalizedLocale.split(
      NORMALIZED_LOCALE_DESIGNATORS_SEPARATOR
    )[0]]: -1,
  };
  for (const localeToTry of localesToTry) {
    if (typeof allLocalesMap[localeToTry] !== "undefined") {
      return [localeToTry, true];
    }
  }
  return [defaultNormalizedLocale, false];
}
