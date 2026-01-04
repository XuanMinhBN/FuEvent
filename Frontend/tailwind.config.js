/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/main/webapp/index.html',
    './src/main/webapp/app/**/*.ts',
    './src/main/webapp/app/**/*.tsx',
    './src/main/webapp/app/**/*.jsx',
    './src/main/webapp/app/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
