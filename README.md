# Name Tag++

Rename. Transform. Collect. Name Tag++ lets players discover 35 unique names across five tiers, turning compatible mobs into companions, empowered enemies, and boss encounters through a survival progression system built around the vanilla Name Tag.

## Asset Notice

All current visual, audio, and icon assets are placeholder assets for prototype and portfolio review. They are not final production assets and may be replaced in future versions.

## Links

- [Game Design Document](https://www.notion.so/Name-Tag-GDD-35e4dedd24de81c59437ee4f43213e03)
- YouTube Video: [Watch on YouTube](https://youtu.be/Eipn8S22Qt4)

  [![YouTube Video thumbnail](https://img.youtube.com/vi/Eipn8S22Qt4/hqdefault.jpg)](https://youtu.be/Eipn8S22Qt4)
- [rgl](https://github.com/ink0rr/rgl)

## Download

Download the latest `.mcaddon` from the [Releases page](https://github.com/AdonisZK-Portfolio/NameTagPlusPlus/releases).

1. Open the latest release.
2. Download `NameTagPlusPlus-*.mcaddon` from Assets.
3. Open the downloaded file with Minecraft Bedrock.
4. Enable both the Behavior Pack and Resource Pack in your world settings.

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
