export const siteUrl = "https://somanathkhadanga.com";

/** Transparent mark pack — only brand assets kept in /public */
export const siteLogoVariants = "/somanath-transparent-logo-3-variants";

/** Colored transparent — primary mark on dark UI (navbar / footer) */
export const siteLogoColored = `${siteLogoVariants}/somanath-icon-colored-transparent.png`;

/** White transparent — monochrome on dark UI */
export const siteLogoWhite = `${siteLogoVariants}/somanath-icon-white-transparent.png`;

/** Black transparent — on light / pale surfaces */
export const siteLogoBlack = `${siteLogoVariants}/somanath-icon-black-transparent.png`;

/**
 * App-icon style mark for schema / OG / Search.
 */
export const siteLogoPath = "/somanath-icon-black.png";
export const siteLogoUrl = `${siteUrl}${siteLogoPath}`;

export const siteLogoMarkDarkUi = siteLogoColored;
export const siteLogoMarkLightUi = siteLogoBlack;
