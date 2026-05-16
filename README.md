# Name Tag++

Rename. Transform. Collect. Name Tag++ lets players discover 35 unique names across five tiers, turning compatible mobs into companions, empowered enemies, and boss encounters through a survival progression system built around the vanilla Name Tag.

## Links

- [GDD](https://www.notion.so/Name-Tag-GDD-35e4dedd24de81c59437ee4f43213e03)
- [rgl](https://github.com/ink0rr/rgl)

## Repository Layout

- `data/scripts`: TypeScript source for Script API gameplay logic.
- `packs/BP`: Behavior pack files.
- `packs/RP`: Resource pack files.
- `config.json`: rgl project configuration.
- `package.json`: Script API package dependencies.

## Development

Install dependencies:

```bash
npm install
```

Install rgl by following the official setup guide on the [rgl project page](https://github.com/ink0rr/rgl).

Start development watch mode:

```bash
rgl watch
```

rgl handles TypeScript compilation and pack output. Source scripts stay in `data/scripts`.
