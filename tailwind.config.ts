/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'floating-points': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '85%': { opacity: '0' },
          '100%': { transform: 'translateY(-55px)', opacity: '0' },
        },
        'dash': {
          'from': { strokeDasharray: '0 100' },
          'to': { strokeDasharray: '68 0' },
        }
      },
      animation: {
        'floating-points': 'floating-points infinite ease-in-out',
        'dash': 'dash 1s linear forwards',
      }
    },
  },
}