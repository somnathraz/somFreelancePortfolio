// Directional SaaS MVP cost model — not a quote.
// Numbers encode a base build plus deltas per scope decision, derived from
// the cost drivers in content/blog/saas-mvp-cost-2026.mdx (scope, roles,
// billing, AI, integrations, design quality, admin tooling, launch quality).

export type Range = { min: number; max: number };

export type CalculatorField =
  | "workflowComplexity"
  | "roles"
  | "billing"
  | "ai"
  | "integrations"
  | "design"
  | "adminTools"
  | "launchQuality";

export type CalculatorOption = {
  value: string;
  label: string;
  description: string;
  cost: Range;
  weeks: Range;
};

export type CalculatorQuestion = {
  field: CalculatorField;
  title: string;
  hint: string;
  options: CalculatorOption[];
};

export type CalculatorAnswers = Record<CalculatorField, string>;

export const BASE_BUILD = {
  cost: { min: 3500, max: 6000 },
  weeks: { min: 3, max: 5 },
  label: "Core build (auth, one dashboard, responsive UI, deployment)",
};

export const CALCULATOR_QUESTIONS: CalculatorQuestion[] = [
  {
    field: "workflowComplexity",
    title: "Core product workflow",
    hint: "The single biggest cost driver is scope, not page count.",
    options: [
      {
        value: "single",
        label: "One core workflow",
        description: "A narrow MVP solving one problem well.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "multiple",
        label: "A few connected workflows",
        description: "Several features that share data and state.",
        cost: { min: 1500, max: 3000 },
        weeks: { min: 1, max: 2 },
      },
      {
        value: "complex",
        label: "Complex, multi-step workflows",
        description: "Dynamic dashboards, branching logic, dependent steps.",
        cost: { min: 4000, max: 8000 },
        weeks: { min: 3, max: 5 },
      },
    ],
  },
  {
    field: "roles",
    title: "Users, roles & permissions",
    hint: "Admin/user roles and team structures add more work than expected.",
    options: [
      {
        value: "none",
        label: "Single user type",
        description: "No admin role, no team structure.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "basic",
        label: "Admin + user roles",
        description: "Basic role separation and access control.",
        cost: { min: 1200, max: 2500 },
        weeks: { min: 1, max: 1.5 },
      },
      {
        value: "multiTenant",
        label: "Teams / multi-tenant",
        description: "Workspaces, invitations, granular permissions.",
        cost: { min: 3000, max: 6000 },
        weeks: { min: 2, max: 4 },
      },
    ],
  },
  {
    field: "billing",
    title: "Payments & billing",
    hint: "Billing turns the product into a billing product too.",
    options: [
      {
        value: "none",
        label: "No billing",
        description: "Free, internal, or billed manually for now.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "simple",
        label: "Simple subscription",
        description: "One or two plans via Stripe or similar.",
        cost: { min: 1500, max: 2500 },
        weeks: { min: 1, max: 1.5 },
      },
      {
        value: "complex",
        label: "Complex billing",
        description: "Multiple plans, trials, proration, invoices, coupons.",
        cost: { min: 4000, max: 7000 },
        weeks: { min: 2.5, max: 4 },
      },
    ],
  },
  {
    field: "ai",
    title: "AI features",
    hint: "Worth it only if AI makes v1 meaningfully more useful.",
    options: [
      {
        value: "none",
        label: "No AI in v1",
        description: "Keep AI as a post-launch improvement.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "basic",
        label: "One AI feature",
        description: "A single prompt/completion flow in the product.",
        cost: { min: 2000, max: 4000 },
        weeks: { min: 1.5, max: 2.5 },
      },
      {
        value: "advanced",
        label: "Agents / RAG / documents",
        description: "Multi-step agents, retrieval, or document processing.",
        cost: { min: 6000, max: 12000 },
        weeks: { min: 3, max: 6 },
      },
    ],
  },
  {
    field: "integrations",
    title: "Third-party integrations",
    hint: "Small in planning, larger in implementation and upkeep.",
    options: [
      {
        value: "none",
        label: "None at launch",
        description: "No external services to integrate yet.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "few",
        label: "1–2 integrations",
        description: "E.g. email, calendar, or a single data source.",
        cost: { min: 1000, max: 2000 },
        weeks: { min: 0.5, max: 1.5 },
      },
      {
        value: "many",
        label: "3+ integrations",
        description: "Multiple external systems with their own edge cases.",
        cost: { min: 2500, max: 5000 },
        weeks: { min: 1.5, max: 3 },
      },
    ],
  },
  {
    field: "design",
    title: "Design quality",
    hint: "Clean and credible is enough to validate; polish costs more.",
    options: [
      {
        value: "minimal",
        label: "Clean & minimal",
        description: "Usable, consistent, nothing custom.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "polished",
        label: "Polished custom UI",
        description: "Custom UX details, light motion, tuned responsiveness.",
        cost: { min: 1500, max: 3000 },
        weeks: { min: 1, max: 2 },
      },
      {
        value: "premium",
        label: "Premium / motion-rich",
        description: "Brand system, heavy motion, conversion-tuned flows.",
        cost: { min: 3500, max: 6000 },
        weeks: { min: 2, max: 3.5 },
      },
    ],
  },
  {
    field: "adminTools",
    title: "Internal / admin tools",
    hint: "Visibility for you, not just the end user.",
    options: [
      {
        value: "none",
        label: "None yet",
        description: "Manage things directly in the database for now.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "basic",
        label: "Basic admin panel",
        description: "View and edit core records.",
        cost: { min: 1000, max: 2000 },
        weeks: { min: 0.5, max: 1.5 },
      },
      {
        value: "advanced",
        label: "Advanced admin tooling",
        description: "Analytics, audit logs, bulk operations.",
        cost: { min: 2500, max: 5000 },
        weeks: { min: 1.5, max: 3 },
      },
    ],
  },
  {
    field: "launchQuality",
    title: "Launch quality",
    hint: "The part that determines whether you rebuild later.",
    options: [
      {
        value: "demo",
        label: "Internal demo only",
        description: "Skip tests and monitoring for now.",
        cost: { min: -1200, max: -2000 },
        weeks: { min: -1, max: -1.5 },
      },
      {
        value: "standard",
        label: "Standard launch",
        description: "Reasonable testing, error handling, basic monitoring.",
        cost: { min: 0, max: 0 },
        weeks: { min: 0, max: 0 },
      },
      {
        value: "production",
        label: "Production-grade",
        description: "Test coverage, monitoring, CI/CD, security hardening.",
        cost: { min: 2000, max: 4000 },
        weeks: { min: 1, max: 2.5 },
      },
    ],
  },
];

export const DEFAULT_ANSWERS: CalculatorAnswers = {
  workflowComplexity: "multiple",
  roles: "basic",
  billing: "none",
  ai: "none",
  integrations: "few",
  design: "polished",
  adminTools: "basic",
  launchQuality: "standard",
};

function findOption(field: CalculatorField, value: string): CalculatorOption {
  const question = CALCULATOR_QUESTIONS.find((q) => q.field === field);
  const option = question?.options.find((o) => o.value === value);
  if (!option) {
    throw new Error(`Unknown calculator option: ${field}=${value}`);
  }
  return option;
}

export type CalculatorResult = {
  cost: Range;
  weeks: Range;
  breakdown: { field: CalculatorField; label: string; cost: Range; weeks: Range }[];
};

const MIN_COST_FLOOR = 2500;
const MIN_WEEKS_FLOOR = 2;

function roundCost(value: number) {
  return Math.round(value / 100) * 100;
}

function roundWeeks(value: number) {
  return Math.round(value * 2) / 2;
}

export function calculateMvpCost(answers: CalculatorAnswers): CalculatorResult {
  let costMin = BASE_BUILD.cost.min;
  let costMax = BASE_BUILD.cost.max;
  let weeksMin = BASE_BUILD.weeks.min;
  let weeksMax = BASE_BUILD.weeks.max;

  const breakdown: CalculatorResult["breakdown"] = [
    {
      field: "workflowComplexity",
      label: BASE_BUILD.label,
      cost: BASE_BUILD.cost,
      weeks: BASE_BUILD.weeks,
    },
  ];

  for (const question of CALCULATOR_QUESTIONS) {
    const value = answers[question.field];
    const option = findOption(question.field, value);
    costMin += option.cost.min;
    costMax += option.cost.max;
    weeksMin += option.weeks.min;
    weeksMax += option.weeks.max;
    breakdown.push({
      field: question.field,
      label: `${question.title}: ${option.label}`,
      cost: option.cost,
      weeks: option.weeks,
    });
  }

  costMin = Math.max(MIN_COST_FLOOR, roundCost(costMin));
  costMax = Math.max(costMin + 500, roundCost(costMax));
  weeksMin = Math.max(MIN_WEEKS_FLOOR, roundWeeks(weeksMin));
  weeksMax = Math.max(weeksMin + 1, roundWeeks(weeksMax));

  return {
    cost: { min: costMin, max: costMax },
    weeks: { min: weeksMin, max: weeksMax },
    breakdown,
  };
}

export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatWeeks(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}
