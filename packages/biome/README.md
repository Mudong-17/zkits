# Zkits Biome

## Setup

Install the dependencies:

```bash
pnpm install @zkits/biome
```

## Get started

Edit the `biome.json` file to your liking.

```json
{
  "extends": [
    "@zkits/biome/base.json"
  ]
}
```

## Run Biome

```bash
npx biome check --write
```

## Biome Config

### VCS

The VCS config extends the recommended rules from Biome.

```json
{
  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": false
  },
}

### Linter

The linter config extends the recommended rules from Biome.

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### Formatter

The formatter config extends the recommended rules from Biome.

```json
{
 	"formatter": {
		"enabled": true,
		"indentStyle": "tab",
		"indentWidth": 2,
		"lineWidth": 120
	},
	"organizeImports": {
		"enabled": true
	},
	"javascript": {
    "formatter": {
			"quoteStyle": "double",
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "trailingCommas": "all",
      "semicolons": "asNeeded",
			"arrowParentheses":"asNeeded",
      "bracketSameLine": true,
      "bracketSpacing": true
    }
  },
	"json": {
		"parser": {
			"allowComments": true,
			"allowTrailingCommas": true
		},
		"formatter": {
			"trailingCommas":"none"
		}
	}
}
```
