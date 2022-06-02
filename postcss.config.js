module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {},
    cssnano: env === "production" ? {} : false,
  },
});
