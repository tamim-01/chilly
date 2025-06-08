import getTranslation from "@/utils/getTranslation";

describe("getTranslation", () => {
  it("returns translation for existing key and locale", () => {
    const t = getTranslation("fa");
    expect(t("menu.category.label")).toBe("دسته بندی");
  });
  it("returns key if not found in any locale", () => {
    const t = getTranslation("fa");
    // @ts-expect-error - because this is a fallback test
    expect(t("the.key.does.not.exist")).toBe("the.key.does.not.exist");
  });
  it("replaces variable placeholders", () => {
    const variables = {
      en: { restaurant: "HOT CHILLY" },
      fa: { restaurant: "Tesla" },
    };
    const tFa = getTranslation("fa", variables);
    expect(tFa("menu.title.one")).toBe("Tesla");

    const tEn = getTranslation("en", variables);
    expect(tEn("menu.title.one")).toBe("HOT CHILLY !!!");
  });
  it("does not replace if variable not provided", () => {
    const t = getTranslation("en");
    expect(t("menu.title.one")).toBe("[restaurant] !!!");
  });
  it("should handle missing variable values for a given locale", () => {
    const variables = {
      en: { restaurant: "Hot Chilly" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const t = getTranslation("fa", variables);
    expect(t("menu.title.one")).toBe("[restaurant]");
  });
});
