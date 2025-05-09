# Strapi plugin locale-select

A Strapi custom field for selecting any locale based on the [Luxon](https://moment.github.io/luxon/) locales.
Currenty it has:
- Country, with Flags
- Language
- Timezone
- Currency

## Installation

To install this plugin, you need to add an NPM dependency to your Strapi application:

```sh
# Using yarn
yarn add strapi-plugin-locale-select

# Using npm
npm install strapi-plugin-locale-select

# Using pnpm
pnpm add strapi-plugin-locale-select
```

Then, you'll need to build your admin panel:

```sh
# Using yarn
yarn build

# Using npm
npm run build

# Using pnpm
pnpm build
```

## Usage

After installation you will find the locale-select at the custom fields section of the content-type builder.

![locale select screenshot](/assets/locale-select-custom-field.png)

Now you can select any country from the list. The Alpha-2 code of the selected locale is stored in the database.

![locale select screenshot](/assets/locale-select.png)

## Development

### Plugin creation

This plugin was created using [Strapi 5 plugin SDK](https://docs.strapi.io/dev-docs/plugins/development/plugin-sdk)

```sh
# Using yarn
yarn dlx @strapi/sdk-plugin init strapi-plugin-locale-select

# Using npm
npx @strapi/sdk-plugin init strapi-plugin-locale-select

# Using pnpm
pnpm dlx @strapi/sdk-plugin init strapi-plugin-locale-select
```

### Start watch mode on the plugin

To start working on your plugin

- Open a terminal
- Navigate to your plugin folder `strapi-plugin-locale-select`
- Run the following command

```sh
# Using yarn
yarn watch:link

# Using npm
npm run watch:link

# Using pnpm
pnpm watch:link
```

### Link the plugin to your Strapi project

To link the plugin to your Strapi project

- Open a terminal
- Navigate to your Strapi project
- Run the following commands

```sh
# Using yarn
yarn dlx yalc add --link strapi-plugin-locale-select
yarn install

# Using npm
npx yalc add strapi-plugin-locale-select
npx yalc link strapi-plugin-locale-select
npm install

# Using pnpm
pnpm dlx yalc add --link strapi-plugin-locale-select
pnpm install

```

## Related

This plugin is inspired by Chris Ebert's [strapi-plugin-country-picker](https://github.com/ChrisEbert/strapi-plugin-country-picker)
