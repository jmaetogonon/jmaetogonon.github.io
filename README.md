# Jochelle Mae Mabasa — Developer Portfolio

Personal portfolio built with standalone .NET 10 Blazor WebAssembly and published as static files at <https://jmaetogonon.github.io/>. The repository root contains `JochellePortfolio.csproj`; GitHub Actions publishes its generated `wwwroot` output to GitHub Pages.

## Run locally

Install the .NET 10 SDK, then run from the repository root:

```sh
dotnet restore JochellePortfolio.csproj
dotnet watch
```

## Build and preview the static site

```sh
dotnet publish JochellePortfolio.csproj --configuration Release
```

The deployable site is generated at `bin/Release/net10.0/publish/wwwroot`. Preview it with any static file server. Keep `<base href="/">` in `wwwroot/index.html`; this is a root-level GitHub Pages site, not a project site under a repository path.

## GitHub Pages deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch. It restores and publishes the root-level project, uploads only `bin/Release/net10.0/publish/wwwroot`, and deploys that artifact to Pages.

One-time repository setup:

1. In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
2. Ensure Actions are allowed to deploy Pages. The workflow declares `pages: write` and `id-token: write` permissions.
3. Push to `main` or run **Deploy portfolio to GitHub Pages** from the Actions tab.

## Maintain the portfolio

- Edit portfolio content and project gallery mappings in `Pages/Home.razor`.
- Project card visuals and interactions are in `Components/ProjectCard.razor`; skills and experience components are alongside it.
- Styling and responsive/reduced-motion rules are in `wwwroot/css/app.css`; lightweight browser interactions are in `wwwroot/js/portfolio.js`.
- Place project screenshots in their matching `wwwroot/images/projects/<project-slug>/` folder and add their path plus descriptive alt text to `CurrentImages` in `Pages/Home.razor`. The modal displays carousel controls for galleries with multiple images. Use only images safe to publish; redact names, customer data, credentials, and confidential operational information.
- Replace `wwwroot/assets/jochelle-mae-mabasa-cv.pdf` when the CV changes; update its links in `Pages/Home.razor` if you change the filename.
- The Gasta project links to <https://gastaapp.github.io/>. Email and social links are direct links; there is no pretend server-side contact form.

## Troubleshooting

- **Actions says the project file is missing:** the workflow runs at the repository root. The project path is `JochellePortfolio.csproj`, without an extra `JochellePortfolio/` directory prefix.
- **Pages deployment is rejected:** check that Pages source is set to **GitHub Actions** and that the workflow has the permissions listed above.
- **Site is blank or assets are missing:** keep `<base href="/">` and deploy the generated `bin/Release/net10.0/publish/wwwroot` output, not the source folder.
- **Old content remains after deployment:** allow Pages/CDN propagation, then hard-refresh the browser.
