# Deploy ke Vercel

## Prasyarat
- Vercel CLI terinstall: `npm i -g vercel`
- Sudah login: `vercel login`
- Project sudah di-link: `vercel link`

## Deploy

```bash
bash build-vercel.sh && vercel deploy --prebuilt --prod
```

## Catatan

- Build menggunakan Nitro preset `vercel` (bukan default Cloudflare)
- Output dirakit ke `.vercel/output` oleh `build-vercel.sh`
- Jangan gunakan `vercel --prod` langsung — tidak akan build dengan benar
