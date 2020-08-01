import moment from "moment";

type Dictionary<K extends string, T> = { [P in K]?: T };

type Moment = moment.Moment;

export function allSupportedLocales(): string[];
export function allSupportedLocalesMap(): Dictionary<string, number>;

export function defaultFallbackLocale(): string;

export function firstDateOfCurrentMonth(format: string): string;

export function getWeekDays(
  date?: Moment | Date | string | number | undefined
): Date[];
export function getWeekRange(
  date?: Moment | Date | string | number | undefined
): Record<"from" | "to", Date>;

export function importLocale(
  locale: string,
  unknownLocaleCallback: (normalizedLocale: string, locale: string) => undefined
): Promise<string>;

export function toMomentLocale(locale: string): [string, boolean];
