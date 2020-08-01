import moment from "moment";

declare module "moment-utl" {
  type Dictionary<K extends string, T> = { [P in K]?: T };

  import Moment = moment.Moment;

  function allSupportedLocales(): string[];
  function allSupportedLocalesMap(): Dictionary<string, number>;

  function defaultFallbackLocale(): string;

  function firstDateOfCurrentMonth(format: string): string;

  function getWeekDays(
    date?: Moment | Date | string | number | undefined
  ): Date[];
  function getWeekRange(
    date?: Moment | Date | string | number | undefined
  ): Record<"from" | "to", Date>;

  function importLocale(
    locale: string,
    unknownLocaleCallback: (
      normalizedLocale: string,
      locale: string
    ) => undefined
  ): Promise<string>;

  function toMomentLocale(locale: string): [string, boolean];

  export {
    allSupportedLocales,
    allSupportedLocalesMap,
    defaultFallbackLocale,
    firstDateOfCurrentMonth,
    getWeekDays,
    getWeekRange,
    importLocale,
    toMomentLocale,
  };
}
