# Service page SEO plan (US / UK / India)

Data: SEMrush via ToolzBuy (Keyword Magic Tool + SERP analysis), pulled 2026-10-30, plus Google Search Console for somanathkhadanga.com. Volumes are monthly searches; KD is keyword difficulty (0-100). The full keyword list (130 terms, mapped to pages) is in `docs/seo-keywords.csv`.

Filter used: long-tail terms with KD 40 or lower and at least 30 searches a month.

## Starting point

- SEMrush Authority Score 2; 3 organic keywords, none commercial.
- Search Console: 46 indexed, 47 not indexed; ~35 clicks in 3 months; ~5K impressions at 0.7% CTR, average position 8.7.
- 1.7K backlinks from 1.6K referring domains reported. Audit them for spam before building more.

## The 500 visits in 2 months target

Honest read: 500 organic visits a month from service pages within 2 months is unlikely for a domain at Authority Score 2. New pages usually need 4-8 weeks just to be indexed and settle, and service keywords convert to few clicks until a page is in the top 5.

What it would take: a top-5 position (roughly 5-10% CTR) on keywords totalling about 5,000-10,000 monthly searches. The white-label set (about 4,500 searches across the US and UK at KD 7-18) is the only cluster where that is plausible inside 2 months.

Realistic forecast by end of month 2: 150-400 visits a month, made of:

| Source | Expected visits/month at day 60 |
|---|---|
| White-label page (KD 7-18) | 50-150 if it reaches top 10 |
| MVP, React, custom software pages (KD 10-30 long tails) | 30-120 combined |
| Existing blog posts after title/meta rewrites (lift CTR from 0.7% toward 2-3%) | 40-100 |
| Directory listings and profiles (Clutch, GoodFirms, DesignRush) | 20-60 referral |
| LinkedIn / Reddit / founder community posts linking to posts | 50-150 referral (not organic) |

Reaching 500 total visits (organic plus referral) in 2 months is possible if the distribution work happens every week. Reaching 500 from Google alone is a 3-5 month target.

## Page plan

Priority 1 is built in weeks 1-2, priority 2 in weeks 3-4, priority 3 after that.

| Priority | Page | Action | Core keywords (US / UK / IN) | Cluster volume |
|---|---|---|---|---|
| P1 | /white-label-web-development | New page. 301 /agency-development-partner to it, or retarget that page | white label web development (1,000 US KD 9; 590 UK KD 9), white label web development services (720 US KD 13), white label website development (590 US KD 12), white label web design (720 UK KD 7) | ~6,000 |
| P1 | /services/react-development | New page | react js development services (1,600 US KD 29; 210 UK KD 10; 480 IN KD 26), react development services (1,300 US KD 28; 260 UK KD 14), reactjs development services (1,000 US KD 25), react development company (880 IN KD 30) | ~8,000 |
| P1 | /services/mvp-development | New page (broader than SaaS MVP) | mvp development for startups (880 US KD 21; 210 UK KD 25), startup mvp development (480 US KD 29), mvp development cost (320 US KD 18), mvp development team (210 US KD 11), mvp development services (720 IN KD 21), custom mvp development (140 UK KD 10) | ~5,500 |
| P1 | /services/custom-software-development | Retarget existing page (title, H1, copy, FAQ) | custom software development service (1,600 US KD 28), custom software development firm (1,300 US KD 23), custom software development uk (880 UK KD 20), custom software development services (1,300 UK KD 24), custom software engineering (880 IN KD 20) | ~15,000 |
| P2 | /hire-dedicated-developers | New page | hire dedicated developers (1,900 US KD 20; 260 UK KD 15; 880 IN KD 36), hire dedicated developer (590 US KD 20), dedicated developers for hire (170 US KD 5), hire full stack developer (720 IN KD 32) | ~6,000 |
| P2 | /services/saas-development | Built this week; add the product-development terms | saas product development company (720 US KD 13), saas application development company (880 US KD 19), saas development company (1,900 US KD 25) | ~8,500 |
| P2 | /services/web-app-development | New page | web app development (2,400 US KD 33), web application agency (260 UK KD 23), custom web app developers (170 UK KD 25), web app development services (1,000 IN KD 35) | ~8,000 |
| P2 | /services/nextjs-development | New page (current Next.js page is performance only) | next js development services (320 US KD 13), nextjs development company (260 US KD 16) | ~700 |
| P2 | /services/saas-mvp-development | Keep; link to /services/mvp-development to avoid overlap | saas mvp development (260 US KD 18), saas mvp development company (90 US KD 7) | ~500 |
| P3 | /services/ai-saas-development | Retarget title and copy | custom ai development company in usa (210 KD 14), ai integration solutions (210 KD 25), ai agent development services (110 UK KD 18), genai integration services (70 KD 10) | ~1,500 |
| P3 | /services/web-development | New page, UK-led | web development agency (5,400 UK KD 32), web development companies in uk (320 KD 28), top web development companies (590 IN KD 21) | ~7,000 |
| — | /services/nextjs-performance-optimization, /services/production-readiness-upgrade | Keep; no commercial long tail found with volume. Support through blog posts | — | — |

Avoiding overlap: each page gets one primary cluster. SaaS MVP and MVP pages link to each other with clear scope (SaaS-specific vs any startup product). React and Next.js pages link to each other.

## What each new or retargeted page needs

1. Title under 60 characters with the primary keyword first, a matching H1, and a meta description with a concrete promise.
2. 900-1,500 words of real substance: scope, process, stack, timelines, pricing range, FAQ (with FAQPage schema), and links to case studies.
3. Service schema with `areaServed` set to US, UK and India.
4. Pricing in USD, GBP and INR. This is your decision; pages convert poorly without it.
5. Links in from the footer, the services index, the home page where relevant, and 3-5 related blog posts. Links out to 2-3 related service pages.
6. A manual "Request indexing" in Search Console on the day it goes live.

## 8-week schedule

| Week | Work | Effort |
|---|---|---|
| 1 | Deploy current changes. Build /white-label-web-development and retarget /services/custom-software-development. Request indexing. Audit backlinks in SEMrush. | 2 days |
| 1-2 | Build /services/react-development and /services/mvp-development. Add USD/GBP/INR pricing. | 2 days |
| 2 | Rewrite titles and meta descriptions for the 10 blog posts with the most impressions in Search Console. | 0.5 day |
| 2-3 | Create listings on Clutch, GoodFirms, DesignRush, Sortlist and the Google Business Profile; complete LinkedIn company page. | 1-2 days |
| 3-4 | Build /hire-dedicated-developers, /services/web-app-development, /services/nextjs-development. Extend /services/saas-development. | 2-3 days |
| 3-8 | Two blog posts a week aimed at question keywords for the P1 pages (e.g. MVP cost, React vs Next.js for a startup, white-label pricing for agencies), each linking to its service page. | 4-6 hours/week |
| 4-8 | Outreach: 2-4 guest posts or podcast/newsletter mentions a month; answer founder questions on Reddit and Indie Hackers with links where allowed. | 3-5 hours/week |
| 5 | Retarget /services/ai-saas-development; build /services/web-development (UK). | 1 day |
| 6-8 | Weekly check in Search Console and SEMrush Position Tracking; rewrite pages that get impressions but no clicks. | 1-2 hours/week |

Total build effort: roughly 9-11 working days over the first 5 weeks, then 6-10 hours a week ongoing.

## Measuring

- Search Console: impressions and clicks per service page, weekly.
- SEMrush Position Tracking (use the ToolzBuy audit servers): track the P1 and P2 keywords from `docs/seo-keywords.csv` for US, UK and India. Shared accounts can lose projects, so export results weekly.

## Ranking timeline (estimates)

- Weeks 1-4: new pages indexed; first impressions.
- Weeks 4-8: white-label and KD 10-20 terms enter the top 20; some top 10.
- Months 3-5: top 10 for most KD 20-30 terms in the UK and India; 500+ organic visits a month is realistic here.
- Months 6-12: KD 30-40 US terms, with steady link building.
