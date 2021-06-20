////////////////////////////////////
/* Exported Content*/
////////////////////////////////////

/*Theme Interface*/
export interface ColourTheme {
  primary   : ColourSet
  secondary : ColourSet
  tertiary  : ColourSet
  success   : ColourSet
  warning   : ColourSet
  danger    : ColourSet
  dark      : ColourSet
  medium    : ColourSet
  light     : ColourSet
}

////////////////////////////////////
/* Supporting Interfaces and Enums */
////////////////////////////////////

/**
 * Describes the sub-colours of each colour directory.
 */
interface ColourSet {
  main      : string
  contrast  : string
  shade     : string
  tint      : string
}

////////////////////////////////////
/* Differing Themes*/
////////////////////////////////////

/**
 * Blue Theme
 */
const blue : ColourTheme = {
  primary: {
    main      : "#3880ff",
    contrast  : "#ffffff",
    shade     : "#3171e0",
    tint      : "#4c8dff",
  },
  secondary : {
    main      : "#3dc2ff",
    contrast  : "#ffffff",
    shade     : "#36abe0",
    tint      : "#50c8ff",
  },
  tertiary  : {
    main      : "#5260ff",
    contrast  : "#ffffff",
    shade     : "#4854e0",
    tint      : "#6370ff",
  },
  success   : {
    main      : "#2dd36f",
    contrast  : "#ffffff",
    shade     : "#28ba62",
    tint      : "#42d77d",
  },
  warning   : {
    main      : "#ffc409",
    contrast  : "#000000",
    shade     : "#e0ac08",
    tint      : "#ffca22",
  },
  danger    : {
    main      : "#eb445a",
    contrast  : "#ffffff",
    shade     : "#cf3c4f",
    tint      : "#ed576b",
  },
  dark      : {
    main      : "#222428",
    contrast  : "#ffffff",
    shade     : "#1e2023",
    tint      : "#383a3e",
  },
  medium    : {
    main      : "#92949c",
    contrast  : "#ffffff",
    shade     : "#808289",
    tint      : "#9d9fa6",
  },
  light     : {
    main      : "#f4f5f8",
    contrast  : "#000000",
    shade     : "#d7d8da",
    tint      : "#f5f6f9",
  },
}

////////////////////////////////////
/*Current Theme Setting*/
////////////////////////////////////

export const currentTheme : ColourTheme = blue;
