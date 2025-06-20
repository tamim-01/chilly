import languages from "@/locales/languages";
type NestedKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? NestedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];
export type TLanguages = keyof typeof languages;
export type TKeysOfContent = NestedKeys<(typeof languages)["en"]>;

export function getNestedValue<T extends Record<string, unknown>>(
  obj: T,
  path: string
): string | undefined {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof result === "string" ? result : undefined;
}

function getTranslation(
  locale: TLanguages,
  variables?: Record<TLanguages, Record<string, string>>
): (key: TKeysOfContent) => string {
  const translate = (key: TKeysOfContent) => {
    const value =
      getNestedValue(languages[locale], key) ??
      getNestedValue(languages["en"], key) ??
      key;

    return value
      .split(" ")
      .map((c) => {
        const variable = c.match(/^\[(\D+)\]$/);
        if (variable && variables) {
          let res;
          if (variables[locale] && variables[locale][variable[1]]) {
            res = c.replace(/^\[(\D+)\]$/, variables[locale][variable[1]]);
          } else {
            return c;
          }
          return res;
        }
        return c;
      })
      .join(" ");
  };
  return translate;
}

export default getTranslation;
