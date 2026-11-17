# Ansensational CLI

[![npm version](https://img.shields.io/npm/v/ansensational.svg)](https://www.npmjs.com/package/ansensational)
[![npm downloads](https://img.shields.io/npm/dm/ansensational.svg)](https://www.npmjs.com/package/ansensational)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js](https://img.shields.io/node/v/ansensational.svg)](https://nodejs.org/)

**Scaffold new projects from GitHub or GitLab templates with a single command.**

Ansensational is a community-driven template registry and CLI. Discover a
template, clone it into a clean project, choose how git and your package
manager should be handled, and start building.

## Features

- **One-command scaffolding** — `ansensational @author/template my-app`
- **GitHub, GitLab, and custom Git hosts** — including URLs that point at a
  branch or subdirectory.
- **Clean starts** — keep the original history, create a fresh repository, or
  remove git entirely.
- **Package manager aware** — detects npm, pnpm, yarn, and bun, and can switch
  the template to your preferred manager.
- **Community registry** — search and list curated templates, with a local
  cache for offline use.
- **Private/local templates** — add your own templates under `@local` and keep
  them across registry syncs.
- **Scriptable** — `--json` output, non-interactive flags, and no prompts in CI.

## Installation

```bash
# npm
npm install -g ansensational

# pnpm
pnpm add -g ansensational

# yarn
yarn global add ansensational

# bun
bun add -g ansensational
```

Requires Node.js 18 or newer. No installation is required to try it:

```bash
npx ansensational list --remote
```

## Quick start

```bash
# Refresh the community registry (optional; commands can fetch remotely)
ansensational sync

# Browse templates
ansensational list --remote

# Scaffold one
ansensational @andi-nugroho/nest-backend my-app
```

## Commands

| Command                                 | Description                                     |
| --------------------------------------- | ----------------------------------------------- |
| `ansensational <slug> [dest]`          | Scaffold a template (default command)           |
| `ansensational scaffold <slug> [dest]` | Explicit form of the same command               |
| `ansensational list`                   | List templates in the local cache               |
| `ansensational search <query>`         | Search local and remote templates               |
| `ansensational sync`                   | Download the latest community registry          |
| `ansensational add <slug> <url>`       | Add or update a template in your local registry |

Templates can be referenced as `@author/slug`, `author/slug`, or a bare `slug`
when the slug is unique.

### Scaffold options

| Option                 | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `-g, --git <strategy>` | `keep` original history, `fresh` repository, or `remove` git |
| `-p, --pm <manager>`   | `npm`, `pnpm`, `yarn`, or `bun`                              |
| `-f, --force`          | Allow writing into a non-empty destination                   |
| `-y, --yes`            | Skip prompts and use defaults                                |

```bash
# Non-interactive setup for CI or scripts
ansensational @andi-nugroho/backend my-api --git fresh --pm pnpm --yes

# Scaffold into the current (empty) directory
ansensational @andi-nugroho/webapp .

# Add files to an existing directory (explicit opt-in)
ansensational @andi-nugroho/webapp ./existing --force
```

Without `--git`, the CLI prompts when running in a terminal and uses `fresh`
when it is not interactive.

### List and search

```bash
# Local cache only
ansensational list

# Include the remote registry
ansensational list --remote

# Filter by type, framework, or author
ansensational list --type backend --framework nestjs
ansensational list --author andi-nugroho
ansensational list --author @andi-nugroho

# Search names, descriptions, tags, features, and authors
ansensational search postgres
ansensational search nextjs --type fullstack

# Machine-readable output
ansensational list --remote --json
ansensational search hono --json
```

`--author` accepts both the registry username (for example `andi-nugroho`) and
the author's GitHub handle (for example `andi-nugroho`).

### Add a local template

```bash
ansensational add my-private-kit https://github.com/me/private-kit \
  --type fullstack \
  --framework nextjs \
  --description "Internal starter" \
  --tags "typescript,auth,drizzle" \
  --features "rbac,data-tables"

# Local templates are stored under @local
ansensational @local/my-private-kit ./my-app
```

Local templates survive `ansensational sync`. Invalid slugs, URLs, types, and
frameworks are rejected before anything is written, so a typo cannot corrupt
your registry.

### Sync

```bash
ansensational sync
```

Sync replaces the cached community templates with the latest remote registry
and preserves templates you added under `@local`. If the local registry file
is ever corrupt, Ansensational backs it up and starts from a clean registry
instead of crashing.

## Template URL formats

```text
https://github.com/owner/repo
https://github.com/owner/repo/tree/main
https://github.com/owner/repo/tree/main/apps/web
https://gitlab.com/group/subgroup/repo
https://gitlab.com/group/subgroup/repo/-/tree/main/packages/app
```

`git@github.com:owner/repo.git` and `ssh://git@github.com/owner/repo.git` are
accepted by `add` and normalised to HTTPS. `file://` URLs are supported for
local testing and private offline repositories.

## Environment variables

| Variable                          | Purpose                                                         |
| --------------------------------- | --------------------------------------------------------------- |
| `ANSENSATIONAL_HOME`             | Override the local data directory (default `~/.ansensational`) |
| `ANSENSATIONAL_REGISTRY_URL`     | Use a custom registry JSON URL                                  |
| `ANSENSATIONAL_REGISTRY_TIMEOUT` | Registry request timeout in milliseconds (default `15000`)      |
| `ANSENSATIONAL_DEBUG`            | Print stack traces for unexpected errors                        |

## Troubleshooting

**The registry is empty.** Run `ansensational sync` or use
`ansensational list --remote`.

**A template is not found.** Run `ansensational search <query>` or use the full
`@author/slug` form. Use `ansensational list --remote -a <author>` to list an
author's templates.

**Cloning fails with an authentication error.** The template repository is
private or has been moved. Make sure your local git credentials can clone the
URL directly.

**The local registry was invalid.** Ansensational prints the backup path and
starts with an empty registry. Running `ansensational sync` restores the community
templates.

**Prompts are skipped.** Prompts only run in an interactive terminal. Use
`--git` and `--pm` to set values explicitly in CI.

## Contributing templates

The community registry lives in
[`content/templates`](https://github.com/andi-nugroho/ansensational/tree/main/content/templates).
Add your template's JSON file and open a pull request. See the
[template contribution guide](https://github.com/andi-nugroho/ansensational/blob/main/content/templates/CONTRIBUTING.md).

## Links

- [Website and template directory](https://ansensational.vercel.app)
- [Source code](https://github.com/andi-nugroho/ansensational)
- [Issues](https://github.com/andi-nugroho/ansensational/issues)
- [Changelog](./CHANGELOG.md)

## License

MIT © ANSensational Contributors
