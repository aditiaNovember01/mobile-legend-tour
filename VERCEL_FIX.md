# Expo Web Deployment Fix untuk Vercel

## 🎯 Masalah: 404 NOT_FOUND Error

### Penyebab Utama:
1. **SPA Routing Issue** - Expo Router adalah Single Page Application yang memerlukan semua route di-redirect ke `/`
2. **Missing Rewrites** - Tanpa rewrite rules, Vercel mencoba mencari file fisik untuk setiap route (misal `/registration`)
3. **Client-side Routing** - Expo Router handle routing di client-side, bukan server-side

### Mental Model:
```
User Request: /registration
   ↓
Vercel Server: ❌ Cari file "registration.html" → NOT FOUND
   ↓
SEHARUSNYA:
   ↓
Vercel Server: ✅ Redirect ke "/" → index.html
   ↓
Expo Router: Handle "/registration" di client-side
```

## 🔧 Solusi yang Sudah Diterapkan

### 1. Updated `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

**Penjelasan:**
- `"source": "/(.*)"` = Semua request apapun
- `"destination": "/"` = Redirect ke root (index.html)
- Ini membuat semua route di-handle oleh Expo Router di client-side

### 2. Build Command
```json
"buildCommand": "npx expo export -p web"
```

**Kenapa `npx`?**
- Memastikan menggunakan versi Expo yang benar
- Lebih reliable di CI/CD environment

## 📋 Langkah Deploy Ulang

### Option 1: Via Vercel Dashboard

1. **Commit & Push perubahan:**
   ```bash
   git add .
   git commit -m "fix: update vercel config for SPA routing"
   git push origin main
   ```

2. **Redeploy di Vercel:**
   - Vercel akan auto-deploy saat ada push baru
   - ATAU click "Redeploy" di Vercel dashboard

### Option 2: Manual Deploy

```bash
# Test build locally dulu
npm run build

# Check output
ls dist/

# Deploy
vercel --prod
```

## 🚨 Warning Signs untuk Masa Depan

### Tanda-tanda SPA Routing Issue:
- ✅ Homepage works (`/`)
- ❌ Sub-routes return 404 (`/registration`, `/explore`)
- ❌ Refresh page di sub-route = 404
- ✅ Navigation via links works

### Kapan Perlu Rewrites:
- **SPA dengan client-side routing** (React Router, Expo Router, Next.js App Router)
- **Dynamic routes** (`/user/:id`)
- **Nested routes** (`/admin/settings`)

### Kapan TIDAK Perlu Rewrites:
- Static sites tanpa routing
- Server-side rendered apps dengan file-based routing
- API endpoints

## 🎓 Konsep Penting

### SPA vs MPA:
- **SPA (Single Page App)**: Satu HTML file, routing di client
  - Expo Router ✅
  - React Router ✅
  - Vue Router ✅

- **MPA (Multi Page App)**: Banyak HTML files, routing di server
  - Traditional PHP sites
  - Static HTML sites

### Vercel Rewrites vs Redirects:
- **Rewrites**: URL tetap sama, tapi serve file berbeda (untuk SPA)
- **Redirects**: URL berubah, browser navigate ke URL baru

## ✅ Checklist Troubleshooting

Jika masih error setelah fix:

- [ ] Clear Vercel cache: Settings → Clear Cache
- [ ] Check build logs: Deployments → Latest → Build Logs
- [ ] Verify `dist` folder ada `index.html`
- [ ] Test local build: `npm run build && npx serve dist`
- [ ] Check browser console untuk error JavaScript

## 🔄 Alternative Approaches

### Approach 1: Vercel Rewrites (✅ Recommended)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
**Pros:** Simple, standard untuk SPA
**Cons:** None

### Approach 2: Custom 404 Page
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```
**Pros:** More control
**Cons:** Lebih complex, tidak perlu untuk kasus ini

### Approach 3: Next.js (Overkill)
Migrate ke Next.js untuk built-in routing
**Pros:** Server-side rendering, better SEO
**Cons:** Major refactor, tidak perlu untuk app ini

## 🎉 Expected Result

Setelah deploy dengan config baru:
- ✅ `/` works
- ✅ `/registration` works
- ✅ `/explore` works
- ✅ Refresh di any page works
- ✅ Direct URL access works

## 📞 Jika Masih Error

1. Share screenshot build logs
2. Share screenshot deployment settings
3. Check: `https://your-app.vercel.app/_logs`
