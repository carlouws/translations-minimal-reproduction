export default {
    debug: process.env.NODE_ENV !== "production",
    partialBundledLanguages: true,
    fallbackLng: "es",
    supportedLngs: ["en", "es"],
    defaultNS: "global",
    react: { useSuspense: false },
    interpolation: {
        escapeValue: false,
    },
};
