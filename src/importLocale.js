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

import toMomentLocale from "./toMomentLocale";
import { DEFAULT_FALLBACK_LOCALE } from "../res/locales";

/**
 * Imports a Moment locale asynchronously (using dynamic imports).
 *
 * @param {string|*} locale The locale to import. A value which is not a string may be passed and it will be normalized to an empty string
 *                          which will be treated as an unknown locale resolving to the Moment's default locale (USA's English, i.e. "en").
 * @param {(normalizedLocale: string, locale: string|*) => *} [unknownLocaleCallback] A callback called with the Moment's default locale (USA's English, i.e. "en")
 *                                                                                    if the given locale is unknown as its first parameter and the given unknown locale
 *                                                                                    as its second parameter.
 *                                                                                    This callback will be called only when the given locale is not a locale
 *                                                                                    known to Moment and it's not the Moment's default locale (USA's English, i.e. "en").
 *                                                                                    If a locale is unknown, the callback is called before resolving
 *                                                                                    the returned promise and the promise will resolve with the Moment's default locale
 *                                                                                    (USA's English, i.e. "en").
 * @return {Promise} A promise which, if fulfilled, resolves with the normalized locale when the given locale has been imported
 *                   successfully or rejects with an error if the given locale cannot be imported
 *                   (e.g. the locale chunk filename is not found or there is a network error).
 *                   If the locale is unknown, then the returned promise doesn't reject.
 */
export default async function importLocale(
  locale,
  unknownLocaleCallback = void 0
) {
  const [normalizedLocale, isKnown] = toMomentLocale(locale);
  let promise = Promise.resolve();
  if (isKnown) {
    if (normalizedLocale !== DEFAULT_FALLBACK_LOCALE) {
      promise = import(`moment/locale/${normalizedLocale}`);
    } else {
      // Moment does not bundle its default locale in a separate file,
      // so there's nothing to do here.
    }
  } else {
    typeof unknownLocaleCallback === "function" &&
      unknownLocaleCallback(normalizedLocale, locale);
  }
  await promise;
  return normalizedLocale;
}
