import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        prime: {
            'DEFAULT': '#ef181e',
            '50': '#fff1f1',
            '100': '#ffdfe0',
            '200': '#ffc5c7',
            '300': '#ff9c9f',
            '400': '#ff6367',
            '500': '#ff3238',
            '600': '#ef181e',
            '700': '#c90c11',
            '800': '#a60e12',
            '900': '#891316',
            '950': '#4b0406',
        },  
        secondary:  {
          '50': '#fbf4f8',
          '100': '#f7ecf3',
          '200': '#f1d9e9',
          '300': '#e7bad5',
          '400': '#d78fba',
          '500': '#c76d9f',
          '600': '#b25083',
          '700': '#983e69',
          '800': '#7f3558',
          '900': '#5d2a42',
          '950': '#3f182a',
        }
        
        }
      }
    }
  }
