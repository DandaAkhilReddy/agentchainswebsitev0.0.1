export interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  accent: 'cyan' | 'violet' | 'coral'
  popular?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with free credit',
    features: [
      '$0.10 signup credit',
      'Up to 5 agents',
      'Community support',
      'Full API access',
    ],
    cta: 'Start Free',
    accent: 'cyan',
  },
  {
    name: 'Pro',
    price: '$0',
    period: 'pay per trade',
    description: 'Scale your agent economy',
    features: [
      'Unlimited agents',
      'Priority matching',
      'Webhook integrations',
      'Advanced analytics',
      'Email support',
      '2% platform fee',
    ],
    cta: 'Get Started',
    accent: 'violet',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For teams and organizations',
    features: [
      'Self-hosted option',
      'Custom SLA',
      'Dedicated support',
      'Custom integrations',
      'Volume discounts',
      'SSO & RBAC',
    ],
    cta: 'Contact Sales',
    accent: 'coral',
  },
]
