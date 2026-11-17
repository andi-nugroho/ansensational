<p align="center">
  <h1 align="center">ANSensational</h1>
  <p align="center">
    <strong>ANSensational new projects from GitHub or GitLab templates in one command.</strong>
  </p>
  <p align="center">
    Stop bookmarking template URLs. Start building.
  </p>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#commands">Commands</a> •
  <a href="#web-app">Web App</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Features

- **One-command scaffolding** — `ansensational @author/template my-app`
- **GitHub, GitLab, and custom Git hosts** — including branch and subdirectory URLs
- **Clean starts** — keep the original history, create a fresh repository, or remove git entirely
- **Package manager aware** — detects npm, pnpm, yarn, and bun, and can switch the template to your preferred manager
- **Community registry** — search and list curated templates, with a local cache for offline use
- **Private/local templates** — add your own templates under `@local` and keep them across registry syncs
- **Scriptable** — `--json` output, non-interactive flags, and no prompts in CI

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

## Quick Start

```bash
# Scaffold a template into a new directory
npx ansensational @andi-nugroho/nest-backend my-api

# Browse the registry
npx ansensational list --remote

# Search by name, tag, or author
npx ansensational search postgres

# Refresh the local registry cache
npx ansensational sync
```

Templates can be referenced as `@author/slug`, `author/slug`, or a bare `slug`
when the slug is unique.

## Commands

| Command                                 | Description                                   |
| --------------------------------------- | --------------------------------------------- |
| `ansensational <slug> [dest]`          | Scaffold a template (default command)         |
| `ansensational scaffold <slug> [dest]` | Explicit form of the same command             |
| `ansensational list`                   | List templates in the local cache             |
| `ansensational search <query>`         | Search local and remote templates             |
| `ansensational sync`                   | Download the latest community registry        |
| `ansensational add <slug> <url>`       | Add or update a local template under `@local` |

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

# Register a repository URL (branches and subdirectories supported), then use it
ansensational add web-app https://github.com/owner/repo/tree/main/apps/web
ansensational @local/web-app my-app
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

# Machine-readable output
ansensational list --remote --json
ansensational search nextjs --json
```

### Local templates

`ansensational add` writes to your local registry rather than the community one,
so private or work-in-progress templates stay on your machine:

```bash
ansensational add my-starter https://github.com/me/my-starter --type fullstack
ansensational @local/my-starter ./scratch
```

Local templates survive `ansensational sync`; corrupt local registries are backed
up and rebuilt automatically.

## Web App

The `apps/web` package is the template directory at
[ansensational.vercel.app](https://ansensational.vercel.app). It:

- Lists every template in the registry with search and stack filters
- Documents each template and its exact scaffold command
- Generates a sitemap and structured data from `registry/registry.json`

Run it locally with:

```bash
bun install
bun run dev
```

## Project Structure

This is a monorepo containing:

| Path                        | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| `apps/cli`                  | The `ansensational` CLI (published to npm)                 |
| `apps/web`                  | Next.js template directory                                 |
| `packages/schema`           | Zod schemas shared by the CLI, web app, and registry build |
| `content/templates`         | Community template submissions                             |
| `registry/registry.json`    | Compiled registry consumed by the CLI and web app          |
| `scripts/build-registry.ts` | Validates submissions and builds the registry              |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development setup
- Project structure
- Contribution guidelines
- Code style

To submit a template, follow
[content/templates/CONTRIBUTING.md](./content/templates/CONTRIBUTING.md).

For technical details, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## License

Apache-2.0 © Ansensational Contributors

---

<p align="center">
  Made for developers who love shipping.
</p>
