/** Repository descriptions checked against the public READMEs in September 2026. */
export const publicCode = [
  {
    id: "cravyr",
    name: "Cravyr",
    href: "https://github.com/ethantrent/cravyr",
    description: "A mobile app for finding nearby restaurants and saving places to consider. The code connects an Expo/React Native client, an Express API, and shared TypeScript types.",
    limitations: "Start with the README’s code walkthrough and setup notes. Running the app requires the external services listed there.",
  },
  {
    id: "profscore",
    name: "ProfScore",
    href: "https://github.com/ethantrent/ProfScore",
    description: "A browser extension that brings professor-rating lookups into course-registration pages. The code includes page detection, GraphQL requests, and local caching.",
    limitations: "The README explains compatibility limits and how lookups leave the browser. Configured universities are not a verified compatibility guarantee.",
  },
  {
    id: "swytch",
    name: "Swytch · AI Studio team project",
    href: "https://github.com/Break-Through-Tech/Swytch-2C-predicting-job-satisfaction-from-person-job-fit",
    description: "Our team challenge asks whether person-job fit helps predict job satisfaction beyond background factors.",
    limitations: "The public repository currently contains the challenge brief and starter materials. Public modeling artifacts, individual contributions, and results are not yet documented there.",
  },
] as const;
