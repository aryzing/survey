module.exports = (api) => {
  const isTest = api.env() === "test";
  api.cache(true);

  const config = {
    plugins: [
      "@babel/proposal-private-methods",
      "@babel/proposal-class-properties",
      "@babel/plugin-transform-runtime",
    ],
    presets: ["@babel/typescript"],
  };

  if (isTest) {
    config.plugins.push("@babel/plugin-transform-modules-commonjs");
    config.presets.push([
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        modules: "commonjs",
        corejs: 3,
        targets: {
          node: "current",
        },
      },
    ]);

    return config;
  }

  config.presets.push([
    "@babel/preset-env",
    {
      loose: true,
      modules: false,
      useBuiltIns: "usage",
      corejs: 3,
    },
  ]);

  return config;
};
