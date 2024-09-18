/** @type {import('tailwindcss').Config} */ 
module.exports = {
  "content": [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "midnightblue": {
          "100": "#230f59",
          "200": "#080733"
        },
        "mediumblue": "#672bff",
        "white": "#fff",
        "indigo": {
          "100": "#411d9e",
          "200": "#371885"
        },
        "fuchsia": "#d91fff",
        "blueviolet": "#5624d4",
        "darkblue": "#481eb3",
        "mediumslateblue": "#5865f2",
        "silver": "#bfbfbf",
        "darkgray": "#9f9f9f"
      },
      "spacing": {},
      "fontFamily": {
        "public-sans": "'Public Sans'",
        "sarabun": "Sarabun",
        "inter": "Inter",
        "quicksand": "Quicksand"
      },
      "borderRadius": {
        "14xl-5": "33.5px",
        "31xl-5": "50.5px",
        "21xl": "40px"
      },
      "boxShadow": {
        "white-glow": "0 0 10px rgba(255, 255, 255, 0.5)",
      }
    },
    "fontSize": {
      "base": "16px",
      "sm": "14px",
      "mini": "15px",
      "xl": "20px",
      "53xl": "72px",
      "24xl": "43px",
      "39xl": "58px",
      "29xl": "48px",
      "10xl": "29px",
      "19xl": "38px",
      "5xl": "24px",
      "lgi": "19px",
      "13xl": "32px",
      "7xl": "26px",
      "45xl": "64px",
      "32xl": "51px",
      "inherit": "inherit"
    },
    "screens": {
      "mq1225": {
        "raw": "screen and (max-width: 1225px)"
      },
      "lg": {
        "max": "1200px"
      },
      "mq1050": {
        "raw": "screen and (max-width: 1050px)"
      },
      "mq750": {
        "raw": "screen and (max-width: 750px)"
      },
      "mq450": {
        "raw": "screen and (max-width: 450px)"
      },
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px"
    }
  },
  "corePlugins": {
    "preflight": false
  }
}