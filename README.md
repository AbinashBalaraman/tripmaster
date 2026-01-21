# TripMaster 🚀

A modern trip expense management and tracking application built with Next.js, Supabase, and Netlify.

## ✨ Features

- 💰 **Expense Tracking** - Track all trip expenses by category
- 👥 **Member Management** - Manage trip participants and contributions
- 📊 **Visual Analytics** - Beautiful charts and insights
- 🔄 **Real-time Sync** - Changes sync across all devices instantly
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🌙 **Dark Mode** - Eye-friendly dark theme

## 🚀 Live Demo

**Production:** [Your Netlify App URL]

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Deployment:** Netlify
- **State Management:** Zustand

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## 🗄️ Database Setup

Run the SQL scripts in order:

1. `supabase/schema.sql` - Create tables
2. `supabase/seed.sql` - Insert default data

See `supabase/README.md` for details.

## 🔧 Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Documentation

- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Deployment guide
- [`supabase/README.md`](supabase/README.md) - Database documentation
- [`GIT_GUIDE.md`](GIT_GUIDE.md) - Git workflow
- [`NETLIFY_SETUP.md`](NETLIFY_SETUP.md) - CI/CD setup

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📄 License

MIT

---

**Built with ❤️ for hassle-free trip management**
