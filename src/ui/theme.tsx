import { ThemeConfig } from "antd";
import merge from "lodash/merge";

const createTheme = (theme: ThemeConfig): ThemeConfig => {
  return extend(themeBase, theme);
};

const extend = (target: ThemeConfig, theme: ThemeConfig) => {
  return merge<ThemeConfig, ThemeConfig, ThemeConfig>({}, target, theme);
};

const themeBase: ThemeConfig = {
  cssVar: true,
  hashed: false,

  token: {
    fontFamily: "inherit",
    fontSize: 11,
    // @ts-ignore
    fontHeight: 16,
    lineHeight: 1.454545454545455,

    motionDurationFast: "0.1s",
    motionDurationMid: "0.1s",
    motionDurationSlow: "0.1s",

    linkHoverDecoration: "underline",

    borderRadius: 2,
  },

  components: {
    Collapse: {
      fontSize: 11,
      headerPadding: "12px 0",
      contentPadding: "0 0 0 14px",
      paddingSM: 0,
      marginSM: 4,
    },

    List: {
      itemPadding: "4px 0",
    },

    Slider: {
      controlHeight: 14,
      controlHeightLG: 14,
    },
  },
};

export const figmaLight = createTheme({
  token: {
    colorPrimary: "#0d99ff",
    colorLink: "#0d99ff",
    colorText: "#000000e5",
    colorBgContainer: "#ffffff",
  },
});

export const figmaDark = createTheme({
  token: {
    colorPrimary: "#0c8ce9",
    colorLink: "#0c8ce9",
    colorText: "#ffffff",
    colorTextSecondary: "#ffffffb2",
    colorTextDescription: "#ffffffb2",
    colorTextPlaceholder: "#ffffffb2",
    colorBgContainer: "#2c2c2c",
    colorBgElevated: "#2c2c2c",
    colorBgLayout: "#383838",
    controlOutline: "#79d29755",
    boxShadowSecondary: `
      0 0 0 1px #79d297,
      0 3px 6px -4px #79d29714,
      0 9px 28px 8px #79d2970d
    `,
  },

  components: {
    Select: {
      optionSelectedBg: "#79d2970d",
      optionActiveBg: "#79d29714",
    },
  },
});

export const figmaDevLight = extend(figmaLight, {
  token: {
    colorPrimary: "#009951",
    colorLink: "#009951",
    colorText: "#000000e5",
    colorBgContainer: "#ffffff",
  },
});

export const figmaDevDark = extend(figmaDark, {
  token: {
    colorPrimary: "#79d297",
    colorLink: "#79d297",
  },
});
