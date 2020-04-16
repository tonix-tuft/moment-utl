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
const FALLBACK_DEFAULT_LOCALE = "en-us";

/**
 * Converts a string representing a locale to a Moment locale.
 *
 * This function reformats an incoming locale (e.g. "zh_CN" to "zh-cn")
 * and checks if it's supported by Moment, falling back to the country,
 * then falling back to the Moment's fallback default locale (USA's English "en-us").
 *
 * @param {string} locale A string representing a locale.
 * @return {string} The Moment locale for the given string.
 */
export default function toMomentLocale(locale) {
  const newLocale = locale.replace("_", "-").toLowerCase();
  const localesToTry = [newLocale, newLocale.split("-")[0]];
  const allLocalesMap = allSupportedLocalesMap();
  for (const localeToTry of localesToTry) {
    if (typeof allLocalesMap[localeToTry] !== "undefined") {
      return localeToTry;
    }
  }
  return FALLBACK_DEFAULT_LOCALE;
}
