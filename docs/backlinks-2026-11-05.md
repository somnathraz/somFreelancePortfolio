# Backlink work — 5 November 2026

## Verified results

- Published a contextual link to `https://somanathkhadanga.com/templates` in the public README of `somnathraz/nextjs-webgl-templates`, alongside a Vercel Deploy button. This is an owner-controlled GitHub link, not an independent editorial endorsement.
- Submitted one landing-page resource entry to `bytefer/awesome-nextjs`: https://github.com/bytefer/awesome-nextjs/pull/39. The entry links to the source repository and `https://demo.somanathkhadanga.com`. Status: open, awaiting maintainer review; not an accepted directory listing.
- Vercel marketplace submission blocked: the form rejected `https://demo.somanathkhadanga.com` with “Demo must be hosted on Vercel.” No submission was sent.
- Three.js forum has an appropriate Showcase category but is signed out. No post was submitted.
- SEMrush domain analysis was gated by login. No authority score, backlink totals, or competitor-gap figures were verified.

## Pages to promote

| Page | Relevant audience and placement | Useful content angle |
| --- | --- | --- |
| `/templates` | Next.js developers, template collections | Open-source templates with code and setup instructions |
| `/templates/nova` | Creative coders, R3F developers | Scroll-driven GPU particle example |
| `/templates/flux` | Three.js / WebGL communities | Interactive GPU fluid simulation |
| `/labs/traps/booking-race-condition` | Backend engineers, PostgreSQL learners | Step-by-step concurrency bug replay |
| `/tools/saas-mvp-cost-calculator` | Founders planning an MVP | Explain estimates and assumptions before sharing a calculator |
| `/white-label-web-development` | Agency partners | Actual collaboration write-ups and partner references |
| `/services/saas-mvp-development` | SaaS founders | Relevant case studies and substantive founder discussions |

Prioritize links to the resource that directly answers the audience's question. Avoid inserting service-page links into unrelated discussions. No paid link purchases, bulk comments, link exchanges, or ranking guarantees.

## DEV draft

Publication update: published on 5 November 2026 at https://dev.to/somnath_khadanga_2e5c2364/reuse-a-3d-landing-page-from-an-open-source-nextjs-template-gallery-45ib. The live article links to `/templates` and the demo subdomain. At verification both links had `rel="noopener noreferrer"`, with no `nofollow`, `ugc`, or `sponsored` token. AI generation was disclosed with DEV's Fully Autonomous setting. Indexing and ranking impact are not yet known.

Title: Reuse a 3D landing page from an open-source Next.js template gallery

Tags: nextjs, webdev, opensource, threejs

I built an MIT-licensed collection of 13 Next.js templates for exploring interactive product pages and WebGL experiments. The examples include GPU fluid simulation, particle morphing, a raymarched black hole, and scroll-driven product scenes.

The [live gallery](https://demo.somanathkhadanga.com) lets you try the interactions before opening the code. The [source repository](https://github.com/somnathraz/nextjs-webgl-templates) contains the gallery and all the examples in one application.

Here is how the project is organized, and how to start with one example instead of adopting the whole gallery.

### Choose the interaction you need

For a product configurator, start with Aura Studio, the headphone example. For a scroll-driven particle experiment, look at Nova. Flux is the fluid simulation you can paint with the cursor. FORME is an architectural page built around a slower motion and image sequence.

These are different starting points. A shader experiment and a product landing page have different jobs. Try the demo first and pick the example whose interaction serves the page you are building.

### Run the gallery locally

The repository documents Node 22+ as its requirement:

```sh
git clone https://github.com/somnathraz/nextjs-webgl-templates.git
cd nextjs-webgl-templates
npm ci
npm run dev
```

Open `http://localhost:3001`, then visit the route you want to explore. The repository also provides `npm run typecheck`, `npm run lint`, and `npm run build` for checking your changes.

### Follow the three folders for a template

Each example is organized around three locations:

```text
src/features/<slug>/   components, hooks, shaders, and theme CSS
src/app/<slug>/        the App Router route and layout
public/<slug>/         static assets
```

The route layout imports its theme and applies a wrapper such as `.theme-<slug>`. This is useful when several visually different examples share an application: the example's styles have an explicit boundary.

When adapting an example, bring the feature code, route, and assets together. Copying only the page component can leave behind an asset or stylesheet it depends on. Review its imports and package dependencies as you move it into your own app.

### Treat the example as a starting point

Replace the concept copy and product assets with your own. Keep important product information and calls to action usable while the 3D scene loads, and check what happens on a touch screen, a narrow viewport, and a slower device.

For a visual effect, decide what it helps the visitor understand. A product rotation may explain a physical detail; a particle animation may establish a mood. Give the interaction a purpose before building the rest of the page around it.

If you are extracting a single example, read its feature folder before removing shared gallery code. Then run the project's checks in your destination application. The examples are reusable source, not a promise that every combination of dependencies and devices will work without adjustment.

### Explore the examples

The [template guides](https://somanathkhadanga.com/templates) describe individual examples and link to the live demos and source. You can browse there, choose one interaction, and work through the associated feature folder.

I am the author of the collection. It is MIT licensed; retain the license notice when reusing the code, and review any asset-specific terms for your use. If you adapt an example, I would be interested in which parts were straightforward to extract and which parts needed clearer documentation.

## Logged-in SEMrush findings and listing shortlist

Checked on 5 November 2026 using the user's ToolzBuy SEMrush access, Server 2 (`semmew.accesstool.in`). The referring-domains route on Server 1 returned Access Denied; Server 2 Backlink Analytics and Bulk Analysis worked.

The overview reports Authority Score 2, 1,688 referring domains, and 1,799 backlinks. Its referring-domain authority distribution puts 99% in the 0–10 band. The Network Graph widget labels the network Dangerous; no Backlink Audit toxicity score was available. These are tool observations, not proof of a search penalty.

The first 100 backlink rows, sorted by Page AS, include DEV posts and canonical references, PaperChai, Cllimber, and a developer newsletter. Numerous later rows repeat the same `dir/white-hat-link-building-194265` path and promotional anchor across different domains. Avoid repeating that directory pattern. No disavow file was created or submitted.

SEMrush Bulk Analysis scores below are platform/domain scores, not the authority of a newly created profile or a guarantee of link equity. Scores are not Moz DA.

| Priority | Platform | SEMrush Authority Score | Target | Verified status and next action |
| --- | --- | ---: | --- | --- |
| 1 | [TechBehemoths](https://techbehemoths.com/companies/get-listed) | 44 | Homepage | Strong service-provider fit. Company-name lookup says Somanath Studio is not listed. Submission requires sign-in. User is signing in; no listing submitted yet. |
| 2 | [Goodfirms](https://www.goodfirms.co/get-listed) | 50 | Homepage | Free application and research review. Registration requires a business email and agreement to terms. Registration page open; no account or listing created. |
| 3 | [Three.js Showcase](https://discourse.threejs.org/c/showcase/7) | 54 (subdomain) | `/templates/flux` or `/templates/nova` plus live demo | The category welcomes projects built with Three.js. Account login needed. Prepare one technical showcase with source and implementation details. |
| 4 | [DEV](https://dev.to/somnath_khadanga_2e5c2364/reuse-a-3d-landing-page-from-an-open-source-nextjs-template-gallery-45ib) | 70 | `/templates`, demo gallery | Published today. Existing referring domain, so this does not add a new referring domain. |
| 5 | [GitHub curated list](https://github.com/bytefer/awesome-nextjs/pull/39) | 100 (github.com) | Demo gallery and source | PR #39 open, awaiting independent maintainer approval. Owner-controlled README link also live. |
| 6 | [Clutch](https://clutch.co/get-listed) | 57 | Homepage / company profile | Free Basic profile exists, but current pricing explicitly says “No Link to Your Website from Directory Pages.” Lower priority for this link-building task. Paid upgrade not purchased. |

### Submission-ready business copy

Company: Somanath Studio

Website: https://somanathkhadanga.com/

Tagline: Founder-led engineering for SaaS products and web applications.

Description:

Somanath Studio is a founder-led engineering studio working with SaaS founders, agencies, and product teams. Its services include MVP development, custom web applications, React and Next.js development, AI product features, performance optimization, and production-readiness improvements. The studio also publishes practical engineering articles, open-source Next.js and WebGL templates, and interactive demonstrations of backend concurrency bugs. Prospective clients can explore service scopes, case studies, and technical resources on the website before discussing a project.

Suggested categories, where available: Web Development; Custom Software Development; React Development; Next.js Development; AI Development.

Portfolio: https://somanathkhadanga.com/case-studies

Open-source examples: https://somanathkhadanga.com/templates

Do not invent founding year, staff count, address, rates, minimum project size, awards, or client reviews. Ask for any required business facts that the public website does not establish. Let the user create or enter a password and accept account terms where necessary.

## Additional domains — confirmed submissions

On 5 November 2026, submitted to three additional relevant project galleries. A web search for the site domain across these three galleries returned no results. SEMrush's source-URL filter failed with “Data is unavailable” and then “Access Denied”; absence from its complete backlink index could not be established. Do not call these confirmed new referring domains until accepted and the public link is verified.

| Destination | Submitted project and requested links | Confirmation | Status |
| --- | --- | --- | --- |
| https://madewithreactjs.com/submit | Next.js WebGL Templates; project link `https://somanathkhadanga.com/templates`; source repository included | “Thanks for submitting your project!” and email notification promised when live | Awaiting editorial review; form states 6–8 weeks |
| https://threejsresources.com/submit | Flux showcase; live demo `/flux`; author homepage `https://somanathkhadanga.com`; description includes `/templates/flux` and source | “Submitted successfully!” / “Your website will be reviewed and published soon.” | Awaiting editorial review; page states within 7 days |
| https://mesh3d.gallery/submit | Flux; maker Somanath Studio with homepage; note includes `/templates/flux` and source | “Thank you for your submission!” / “We've received your website submission and will review it soon.” | Awaiting editorial review; acceptance not guaranteed |

All submissions used free flows. No paid promotion was enabled, newsletter subscription requested, account created, or manual CAPTCHA solved. Public contact email was included where the editorial form requested a contact for notification. These three submissions are not yet live backlinks.

## Goodfirms profile progress

General information saved successfully in the authenticated Goodfirms account. User confirmed founding year 2023 and requested the lowest employee/rate options; selected Freelancer and under $25/hour. Saved company name, tagline, website, public phone/email, description, three selling points, Instagram, and the existing 180px studio icon. Added ChatGPT with purpose “Content drafting and engineering documentation” to satisfy the required AI-tools field, which had been hidden in a collapsed section.

Wizard advanced to Step 2: Locations. Headquarters city/country, street address, and postal code are required and have not been provided. Asked the user for the business address to publish. No location was fabricated. Services and Clients & Industries remain incomplete; clicking Services while Locations was incomplete did not advance the wizard. No final listing publication or live backlink has been verified.

Later update: user authorized using the address on Somanath Studio's Google Business Profile. Located the matching software-company profile linked to `somanathkhadanga.com`, and saved its Bengaluru, Karnataka, India headquarters address and postal code 560037 in Goodfirms. Maps' contact number differs from the site's; general company contact remains the website's number and the optional location phone was left blank.

Services saved: Software Development 60%, Web Development 40%. Software focus: MVP Development 60%, Node.js 20%, ReactJS 20%; Web focus: NextJS 100%. These are listing focus allocations selected to reflect the advertised services, not revenue measurements.

Wizard is now Step 4: Clients & Industries. Asked whether 100% Small Business and 100% Startups is accurate, or whether to use different percentages. Awaiting user response; no key client names fabricated or final save completed.

Final Goodfirms update: user confirmed 100% Small Business and 100% Startups. Saved these allocations and selected Save & Finish. Goodfirms displayed “Congratulations! Your company has been successfully registered!” and said its team will review the information and notify the user when live. Status: submitted, pending Goodfirms review. A public profile URL or live backlink has not yet been verified. Confirmation screenshot: `/tmp/goodfirms-submitted.jpg`.
