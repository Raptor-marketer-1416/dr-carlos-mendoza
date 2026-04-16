@echo off
echo.
echo  Publicando Dr. Carlos Mendoza en Cloudflare Pages...
echo.

set CLOUDFLARE_API_TOKEN=NLn0L2ooM-Q-ENTapCz-ABycp8S5h-be4MSfMvr5
set CLOUDFLARE_ACCOUNT_ID=598d12c266f77cf364564d086167f79f

git add -A
git commit -m "Update: %date% %time%"
git push origin main

npx wrangler pages deploy . --project-name=dr-carlos-mendoza --commit-dirty=true

echo.
echo  Listo! Sitio publicado en https://neurocirujanoqueretaro.com
echo.
pause
