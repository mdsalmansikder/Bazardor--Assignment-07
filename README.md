# বাজার দর — BazarDor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দামের ওঠানামা এবং বিভিন্ন বাজারের দাম এক জায়গায় দেখার একটি responsive ওয়েব অ্যাপ।

## প্রযুক্তি

- Next.js 16 App Router ও React
- TypeScript ও Tailwind CSS
- Better Auth এবং MongoDB
- Programming Hero BazarDor Products API

## প্রধান ফিচার

1. মোবাইল, ট্যাবলেট ও ডেস্কটপ উপযোগী বাংলা UI; বাংলা তারিখ, নেভিগেশন ও চলমান বাজারদর।
2. আজ দাম বেড়েছে/কমেছে এমন পণ্যের তালিকা এবং সব পণ্যের responsive কার্ড।
3. পণ্য বিভাগভিত্তিক তালিকা ও সংখ্যাগত দামে কম-থেকে-বেশি/বেশি-থেকে-কম sorting।
4. লগইন-সুরক্ষিত পণ্যের বিস্তারিত, বাজারভিত্তিক সর্বনিম্ন/সর্বোচ্চ দাম ও গড়ের সারসংক্ষেপ।
5. Better Auth email/password signup, signin, signout, Google/GitHub OAuth এবং লগইন-সুরক্ষিত পৃষ্ঠা।
6. প্রোফাইল দেখা ও Better Auth দিয়ে নাম আপডেট।
7. লোডিং skeleton, ভুল/অজানা রুটের 404 পৃষ্ঠা এবং সফলতা/ত্রুটির toast বার্তা।
8. প্রধান API অনুপলব্ধ হলে বিকল্প BazarDor API-তে অনুরোধ; অনুরোধ ব্যর্থ হলে ব্যবহারকারীকে পুনরায় চেষ্টা করার সুযোগ।

## চালানো

1. Node.js ইনস্টল করে dependencies নিন:

   ```bash
   npm install
   ```

2. `.env.example` কপি করে `.env` বানান। MongoDB connection string এবং Better Auth secret যোগ করুন। OAuth ব্যবহার করলে Google ও GitHub OAuth credentials-ও দিন।
3. OAuth provider console-এ callback URL হিসেবে `http://localhost:3000/api/auth/callback/google` এবং `http://localhost:3000/api/auth/callback/github` যোগ করুন। Deploy করার সময় `BETTER_AUTH_URL` ও `NEXT_PUBLIC_AUTH_URL`-কে production origin-এ সেট করুন।
4. Development server চালান:

   ```bash
   npm run dev
   ```

   এরপর [http://localhost:3000](http://localhost:3000) খুলুন।

## যাচাই

```bash
npm run lint
npm run build
```

## API ও deployment

পণ্য ও বিভাগগুলো Programming Hero BazarDor API থেকে server-side-এ লোড হয়; মূল API ব্যর্থ হলে দুটি বিকল্প endpoint ব্যবহৃত হয়। Vercel-এ deploy করার সময় environment variables যোগ করুন এবং App Router dynamic routes স্বাভাবিকভাবেই handle করবে।
