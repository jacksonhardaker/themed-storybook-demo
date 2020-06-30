const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const theme = process.env.THEME || 'default';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: config => {
    const { plugins, module, ...rest } = config;
    const { rules, ...moduleRest } = module;

    const newConfig = {
      plugins: [
        new ExtractCssChunks({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
        ...plugins,
      ],
      module: {
        rules: [
          {
            test: /\.module\.s(a|c)ss$/,
            loader: [
              isDevelopment ? 'style-loader' : {
                loader: ExtractCssChunks.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  prependData: `@import "${theme}";`,
                  sassOptions: {
                    includePaths: [
                      path.join(__dirname, '..', 'themes')
                    ],
                  },
                },
              },
            ]
          },
          {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            loader: [
              isDevelopment ? 'style-loader' : {
                loader: ExtractCssChunks.loader,
              },
              'css-loader',
              'sass-loader',
            ]
          },
          ...rules
        ],
        ...moduleRest
      },
      ...rest,
    };

    return newConfig;
  }
};
