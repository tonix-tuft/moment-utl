/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
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

import { packagePath, walkSync, basenameWithoutExtension } from "node-utl";
import { writeFileSync } from "fs";

/**
 * @type {string}
 */
const RES_FOLDER_PATH = `${__dirname}/../../res`; // The script executes from within the ./dist/bin directory.

/**
 * @type {string}
 */
const DEFAULT_FALLBACK_LOCALE = "en";

/**
 * Creates a resource file for all the supported locales of the Moment library.
 *
 * @return {undefined}
 * @throws {Error} If the "node_modules/moment/locale" directory is not found.
 */
export default function createAllSupportedLocalesRes() {
  const momentPackagePath = packagePath("moment");
  const localesPath = `${momentPackagePath}/locale`;
  const allSupportedLocalesAbsoluteFilenames = walkSync(localesPath);
  const locales = allSupportedLocalesAbsoluteFilenames.map(
    basenameWithoutExtension
  );
  locales.push(DEFAULT_FALLBACK_LOCALE);
  locales.sort();
  let id = 1;
  const localesCode = `/**
 * This file was automatically built by "moment-utl" or it has been recreated
 * with the "npx moment-utl-locales" command to use the locales of the "moment" package
 * used by the client code.
 */

/**
 * @type {string}
 */
const DEFAULT_FALLBACK_LOCALE = ${JSON.stringify(DEFAULT_FALLBACK_LOCALE)};

/**
 * @type {string[]}
 */
const allSupportedLocales = ${JSON.stringify(locales)};

/**
 * @type {Object}
 */
const allSupportedLocalesObj = ${JSON.stringify(
    locales.reduce((carry, current) => ({ ...carry, [current]: id++ }), {})
  )};

export { DEFAULT_FALLBACK_LOCALE, allSupportedLocales, allSupportedLocalesObj };
`;
  writeFileSync(`${RES_FOLDER_PATH}/locales.js`, localesCode);
}
