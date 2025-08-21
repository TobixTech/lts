# Let's Talk Sport - Professional Sports News Website

A modern, professional sports news website built with Next.js 14, TypeScript, and Tailwind CSS. The site focuses on Manchester United and football news with advanced features including AI-powered search, live game streaming, and comprehensive sports coverage.

## 🚀 Features

### Core Functionality
- **Professional UI/UX**: Modern design on par with major sports media outlets
- **Left Navigation**: Vertical navigation bar for easy page switching
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile
- **Search Functionality**: AI-powered search with Google Gemini API integration

### Pages
- **Home**: Landing page with featured articles and trending topics
- **Clubs News**: News from various clubs with filtering capabilities
- **Live Games**: Watch live matches with YouTube stream integration
- **Leagues & Tables**: League standings, top scorers, and assists
- **Fixtures & Results**: Match schedules, kick-off times, and scores

### Admin Dashboard (`/myadmin`)
- **PIN Authentication**: Secure access with configurable PINs
- **Content Management**: Create, edit, delete, and publish articles
- **Live Game Management**: Add and manage live game streams
- **Club & Fixture Management**: Comprehensive sports data management

### Technical Features
- **Next.js 14**: Latest framework with App Router
- **TypeScript**: Full type safety
- **Prisma ORM**: Database management with PostgreSQL
- **Tailwind CSS**: Utility-first styling approach
- **AI Integration**: Google Gemini API for intelligent search responses

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Icons**: Heroicons & Lucide React
- **AI**: Google Gemini API
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Gemini API key

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lets-talk-sport
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/lets_talk_sport"
   GEMINI_API_KEY="your-gemini-api-key"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main models:

- **Club**: Football clubs with logos and league information
- **Article**: News articles with categories, tags, and club associations
- **LiveGame**: Live streaming games with YouTube URLs
- **League**: Football leagues and competitions
- **Fixture**: Match schedules and results
- **AdminUser**: Admin authentication and roles

## 🔐 Admin Access

Access the admin dashboard at `/myadmin` with these PINs:
- **PIN 1**: `464184`
- **PIN 2**: `229485`

## 🔍 Search Functionality

The search system provides:
1. **AI-Generated Responses**: Using Google Gemini API for intelligent answers
2. **Database Search**: Relevant articles from the website's content
3. **Relevance Scoring**: Articles ranked by search term matching

## 📱 Responsive Design

The website is fully responsive with:
- **Desktop**: Full navigation and content layout
- **Tablet**: Optimized for medium screens
- **Mobile**: Mobile-first approach with touch-friendly interfaces

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start production server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── clubs-news/        # Clubs news page
│   ├── live-games/        # Live games page
│   ├── leagues/           # Leagues & tables page
│   ├── fixtures/          # Fixtures & results page
│   ├── search/            # Search results page
│   ├── myadmin/           # Admin dashboard
│   └── globals.css        # Global styles
├── components/             # Reusable React components
├── lib/                    # Utility functions and configurations
└── types/                  # TypeScript type definitions
```

## 🎨 Customization

### Colors
The primary color scheme uses red (`#DC2626`) for Manchester United branding. Update Tailwind config for custom colors.

### Content
- Update mock data in page components
- Modify Prisma schema for additional fields
- Customize admin dashboard functionality

## 🔧 Development

### Adding New Pages
1. Create new directory in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `src/components/Navigation.tsx`

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update TypeScript types with `npx prisma generate`

## 📊 Performance

- **Image Optimization**: Next.js built-in image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for better performance
- **API Routes**: Serverless functions for dynamic content

## 🔒 Security

- **PIN Authentication**: Secure admin access
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Form validation and sanitization
- **CORS Protection**: API route security

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🚀 Future Enhancements

- **Real-time Updates**: WebSocket integration for live scores
- **User Accounts**: User registration and personalization
- **Push Notifications**: Match alerts and news updates
- **Mobile App**: React Native companion app
- **Analytics**: User behavior tracking and insights
- **Multi-language**: Internationalization support

---

**Built with ❤️ for football fans everywhere**
