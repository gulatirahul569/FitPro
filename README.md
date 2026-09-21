# 💪 FitPro

**Transform your body. Transform your life.**

FitPro is a fitness platform that connects people with certified personal trainers. Users can discover trainers by goal and location, watch free workout videos, and book a demo session. Trainers can create a professional profile, share content, and find clients.

🔗 **Live demo:** [fit-pro-six-dusky.vercel.app](https://fit-pro-six-dusky.vercel.app/)

---

## ✨ Features

### For users
- **Find trainers**: browse certified trainers with ratings, locations, and short bios
- **Train for your goal**: filter by category: Muscle Building, Weight Loss, Yoga & Mobility, and Fitness & Cardio
- **Free workout videos**: follow beginner-friendly sessions uploaded by trainers
- **Partner gyms**: explore gyms listed on the platform
- **Book a demo**: pick a trainer and book a free demo session in a few clicks
- **Authentication**: sign up and log in securely

### For trainers
- **Become a trainer**: apply and build your professional profile
- **Share content**: publish workout videos to reach new clients
- **Grow your business**: get discovered by people looking for personal training

### Site pages
| Route | Description |
|---|---|
| `/` | Landing page: hero, featured trainers, how it works, videos, testimonials |
| `/trainers` | Browse and filter all trainers |
| `/trainers/[id]` | Individual trainer profile |
| `/videos` | Workout video library |
| `/videos/[id]` | Individual video page |
| `/gyms` | Partner gyms |
| `/become-trainer` | Trainer application |
| `/login` | Authentication |
| `/contact`, `/faq` | Support pages |
| `/privacy`, `/terms`, `/cookies` | Legal pages |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI library | [React 19](https://react.dev/) with the React Compiler |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Authentication | [Auth.js (NextAuth v5)](https://authjs.dev/) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| Database | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| File storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Linting | ESLint 9 |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 20 or later
- A [MongoDB](https://www.mongodb.com/atlas) database (local or Atlas)
- A [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) store (only needed for file uploads)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/gulatirahul569/FitPro.git
cd FitPro

# 2. Install dependencies
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>

# Auth.js secret (generate one with: npx auth secret)
AUTH_SECRET=your-random-secret

# Vercel Blob token (for uploads)
BLOB_READ_WRITE_TOKEN=your-blob-token
```

> Variable names may differ slightly depending on how they're read in the code. Adjust to match your setup.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase with ESLint |

---

## 📁 Project Structure

```
FitPro/
├── src/                 # Application source (pages, components, models, utilities)
├── eslint.config.mjs    # ESLint configuration
├── jsconfig.json        # Path aliases
├── next.config.mjs      # Next.js configuration
├── postcss.config.mjs   # PostCSS / Tailwind configuration
└── package.json
```

---

## ☁️ Deployment

The easiest way to deploy FitPro is with [Vercel](https://vercel.com/new):

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add the environment variables listed above in **Project Settings → Environment Variables**
4. Deploy

---

## 🗺️ Roadmap

- [ ] Real-time trainer availability and scheduling
- [ ] Progress tracking dashboard
- [ ] In-app messaging between clients and trainers
- [ ] Payments for paid sessions and programs
- [ ] Reviews and ratings from verified clients

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Rahul Gulati**
GitHub: [@gulatirahul569](https://github.com/gulatirahul569)

