# Flowvahub Assessment

## Installation

1. Clone the repository
2. Run `npm install`
3. Add your environment variable credentials as shown in `example.env`
   - **Note:** The variables in `example.env` are placeholder values only
4. Run `npm run dev` to start the development server

---

## Project Overview

After reviewing the assessment requirements, I identified that authentication was a key component and implemented a complete auth system for the application.

### Authentication

I implemented two authentication methods:

- **Email Authentication** - Traditional email/password sign-up and login
- **Google OAuth** - Fully functional Google sign-in integration

Upon successful authentication, users are redirected to the **Dashboard Rewards** page. Other routes in the sidebar are currently locked as they were not part of the assessment scope.

### Implemented Features

The following core functionalities have been implemented:

1. **Progression Balance** - Track and display user progress
2. **Daily Streak** - Monitor consecutive daily activity
3. **Notifications** - User notification system
4. **Complete Auth Flow** - Sign-up, login, and logout functionality

### Limitations

**Icon Library Inconsistency**  
I was unable to source the exact icon pack used in the original design. To maintain visual consistency throughout the application, I used Lucide React for all icons. As a result, some icons may differ slightly from those on the original site.

---

## Environment Variables

Ensure you configure the following in your `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
