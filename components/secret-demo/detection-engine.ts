export interface DetectionResult {
  hasThreat: boolean;
  match?: string;
  ruleName?: string;
  confidence?: string;
  startIndex?: number;
  endIndex?: number;
  tokenType?: string;
}

// Client-side demo credential regex patterns
const DEMO_RULES = [
  {
    name: "Stripe Live API Key",
    tokenType: "STRIPE_SECRET_KEY",
    regex: /(?:sk_live_|pk_live_)[a-zA-Z0-9_\-]{8,}/i,
    confidence: "99.8%",
  },
  {
    name: "Generic API/Secret Key",
    tokenType: "GENERIC_API_TOKEN",
    regex: /(?:API_KEY|SECRET_KEY|AUTH_TOKEN|PRIVATE_KEY)\s*[:=]\s*["']?([a-zA-Z0-9_\-\.]{8,})["']?/i,
    confidence: "96.4%",
  },
  {
    name: "AWS Access Key",
    tokenType: "AWS_ACCESS_CREDENTIAL",
    regex: /(?:AWS_ACCESS_KEY_ID|AKIA|ABIA|ACCA|ASIA)[0-9A-Z_]{8,}/i,
    confidence: "98.9%",
  },
  {
    name: "GitHub Access Token",
    tokenType: "GITHUB_TOKEN",
    regex: /(?:ghp_|gho_|ghu_|ghs_|ghr_)[a-zA-Z0-9]{12,}/i,
    confidence: "99.9%",
  },
  {
    name: "Demo Token String",
    tokenType: "DEMO_TOKEN",
    regex: /(?:TOKEN|SECRET)\s*[:=]\s*["']?(demo_[a-zA-Z0-9_\-]{6,})["']?/i,
    confidence: "97.5%",
  },
];

export function analyzeCodeLocally(content: string): DetectionResult {
  if (!content || content.trim().length === 0) {
    return { hasThreat: false };
  }

  for (const rule of DEMO_RULES) {
    const match = content.match(rule.regex);
    if (match && match.index !== undefined) {
      return {
        hasThreat: true,
        match: match[0],
        tokenType: rule.tokenType,
        ruleName: rule.name,
        confidence: rule.confidence,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
      };
    }
  }

  return { hasThreat: false };
}
