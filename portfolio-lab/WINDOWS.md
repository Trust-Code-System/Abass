# Open the portfolio on your Windows laptop

The validated servers run on the cloud machine. Nothing has been copied to your laptop automatically. A cloud `localhost:3000` address does not refer to your laptop.

## 1. Download and extract

Download `portfolio-lab-windows.zip` from this conversation or the workspace file browser into your Windows Downloads folder. The archive contains a top-level `portfolio-lab` folder. If the chat client does not expose cloud-file downloads, use its workspace download/export action to retrieve the archive; there is no file-transfer connection to your computer available to the agent.

Open PowerShell and run:

```powershell
New-Item -ItemType Directory -Force "$HOME\Projects" | Out-Null
Expand-Archive -LiteralPath "$HOME\Downloads\portfolio-lab-windows.zip" -DestinationPath "$HOME\Projects"
Set-Location "$HOME\Projects\portfolio-lab\my-portfolio"
```

Use a different destination if you already have a `portfolio-lab` folder. Do not overwrite existing personal projects.

## 2. Install Node.js

Install Node.js **24 LTS** from https://nodejs.org/ if it is not already installed. Reopen PowerShell after installation. Check:

```powershell
node --version
npm.cmd --version
```

Using `npm.cmd` avoids PowerShell execution-policy errors from `npm.ps1`. This does not change your security settings.

## 3. Install and run your portfolio

```powershell
Set-Location "$HOME\Projects\portfolio-lab\my-portfolio"
npm.cmd ci
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

Leave this window open. Once it says Ready, open Chrome and type:

**http://localhost:3000**

This address works on your laptop only after these commands run successfully there. Changes saved in `src` refresh the preview. Stop it with Ctrl+C.

## 4. Run both references too (optional)

Install Git for Windows from https://git-scm.com/download/win and reopen PowerShell. From the lab root:

```powershell
Set-Location "$HOME\Projects\portfolio-lab"
node .\scripts\install-lab.mjs
node .\scripts\start-lab.mjs
```

The installer prepares all three apps. It clones the references at their pinned revisions, patches Dennis's unavailable media to use local files, and preserves existing changes if a conflict is found. No Cloudinary credentials are needed.

The launcher opens three PowerShell windows. If you started the customized app manually in step 3, stop that earlier instance first so port 3000 is free. Wait for Ready in each window, then open:

| Experience | Windows URL |
| --- | --- |
| Your customized portfolio | http://localhost:3000 |
| Dennis recreation with local media | http://localhost:3001 |
| Rishi original | http://localhost:3002 |

Rishi's unchanged reference uses Google Fonts and needs access to `fonts.googleapis.com` and `fonts.gstatic.com` while compiling. Your customized app uses bundled fonts. If a port is occupied, stop the known server in its terminal; the launcher does not terminate other applications.

## 5. Check a production build

Stop the customized development server with Ctrl+C, then run:

```powershell
Set-Location "$HOME\Projects\portfolio-lab\my-portfolio"
npm.cmd run lint
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3000
```

This is a local production-mode server, not a deployment. Cloud Linux builds and browser checks were executed; these Windows-specific commands have not been executed on your laptop.
