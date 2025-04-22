import type { Config } from 'tailwindcss';
import { nextui } from "@nextui-org/react";
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      boxShadow: {
        custom: '0px 20px 48px 0px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-sora)', ...fontFamily.sans],
        code: 'var(--font-code)',
        grotesk: 'var(--font-grotesk)',
        display: ['Inter', 'sans-serif'],
        'sf-pro': [
          '-apple-system',
          'SF Pro Display',
          'BlinkMacSystemFont',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Ubuntu',
          'sans-serif'
        ],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        'display-xs': '1.5rem', // 24px
        'display-sm': '1.875rem', // 30px
        'display-md': '2.25rem', // 36px
        'display-lg': '3rem', // 48px
        'display-xl': '3.75rem', // 60px
        'display-2xl': '4.5rem', // 72px
        'text-md': '1rem', // 16px
      },
      lineHeight: {
        'display-xs': '2rem', // 32px
        'display-sm': '1.375', // 41.25px
        'display-md': '1.2', // 43.2px
        'display-lg': '1.167', // 56px
        'display-xl': '1.167', // 70px
        'display-2xl': '1.167', // 84px
        'text-md': '1.5rem', // 24px
        'leading-48': '48px',
        'leading-26': '26px',
      },
      letterSpacing: {
        tagline: '.15em',
      },
      spacing: {
        0.25: '0.0625rem',
        7.5: '1.875rem',
        14: '3.5rem', // 56px
        15: '3.75rem',
      },
      opacity: {
        15: '.15',
      },
      brightness: {
        65: '.65',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'linear',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      borderWidth: {
        DEFAULT: '0.0625rem',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)',
        'primary-gradient': 'linear-gradient(287.57deg, #16B364 -1.34%, #58D699 98.63%)',
      },
      colors: {
        primary: '#58D699',
        danger: '#58D699',
        tertiary:{
          600: '#485466',
        },
        brand: {
          solid: '#2395CF'  // Add this color definition
        },
        app: {
          main: {
            DEFAULT: '#16B364',
          },
          primary: '#16B364',
          text: {
            secondary: '#475467'
          },
          border: {
            success: '#44CB89'
          }
        },
        secondary: {
          DEFAULT: '#F9FAFB',  // Add this line for bg-secondary
          100: '#F2F4F7',
          200: '#E4E7EC',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
        },
        default: {
          DEFAULT: '#F5F5F5',
          hover: '#E5E5E5',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#525252',
          900: '#363636',
          1000: '#262626',
          focus: '#0077FF',
        },
        utility: {
          success: {
            50: '#ECFDF3',
            200:'#ABEFC6',
            700:'#067647'
          },
          grey:{
            50: '#F9FAFB',
            200:'#E4E7EC',
            700:'#344054'
          },
          pink:{
            50: '#FDF2FA',
            200:'#FCCEEE',
            700:'#C11574'

          }

        },
      },
      borderColor: {
        error: '#FF3B30',
        primary: '#C60001',
        secondary: '#E4E7EC'  // Add this line
      },
      flex: {
        '2': '2 2 0%',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ addBase, addComponents, addUtilities, matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      ),
      addBase({});
      addComponents({
        '.container': {
          '@apply mx-auto px-4 md:px-10 lg:px-15 max-w-full 2xl:max-w-[117.5rem]': {},
        },
        '.h1,h1': {
          '@apply font-semibold text-[2.5rem] leading-[3.15rem] md:text-[2.60rem] md:leading-[3.55rem] lg:text-[3rem] lg:leading-[3.85rem] xl:text-[3.25rem] xl:leading-[4.15rem]': {},
        },
        '.h2,h2': {
          '@apply text-[2rem] leading-normal': {},
        },
        '.h3,h3': {
          '@apply text-[1.5rem] leading-normal': {},
        },
        '.h4,h4': {
          '@apply text-[1.25rem] leading-normal': {},
        },
        '.h5,h5': {
          '@apply text-2xl leading-normal': {},
        },
        '.h6,h6': {
          '@apply font-semibold text-lg leading-8': {},
        },
        '.caption,caption': {
          '@apply text-sm text-neutral-400 font-[400]': {},
        },
        '.tagline': {
          '@apply font-grotesk font-light text-xs tracking-tagline uppercase': {},
        },
        '.quote': {
          '@apply font-code text-lg leading-normal': {},
        },
        '.button': {
          '@apply font-code text-xs font-bold uppercase tracking-wider': {},
        },
      });
      addUtilities({
        '.tap-highlight-color': {
          '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        },
        '.bg-size-100': {
          'background-size': '100% 100%',
        },
      });
    }),
    require('tailwind-scrollbar'),
  ],
} as Config;

export default config;