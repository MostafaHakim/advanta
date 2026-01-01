import { notFound } from "next/navigation";
import { ServiceDetail, RelatedServices } from "@/components/services";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";

// Service data - সব সার্ভিসের ডেটা এখানে
const services = {
  "seo-optimization": {
    id: "seo",
    title: "SEO Optimization",
    tagline: "Rank Higher, Grow Faster",
    description:
      "Comprehensive search engine optimization services to improve your website visibility and drive organic traffic.",
    longDescription: `Our SEO services are designed to improve your website's search engine rankings and drive targeted organic traffic. We combine technical expertise with strategic content optimization to deliver sustainable growth.`,
    heroImage: "/api/placeholder/1200/600",
    icon: "🔍",
    color: "from-blue-500 to-blue-600",
    features: [
      {
        title: "Technical SEO Audit",
        description: "Comprehensive analysis of your website technical health",
        items: [
          "Site Speed Optimization",
          "Mobile Responsiveness",
          "Crawlability Analysis",
        ],
      },
      {
        title: "On-page Optimization",
        description: "Optimizing content and HTML for better rankings",
        items: ["Keyword Optimization", "Meta Tags", "Content Structure"],
      },
      {
        title: "Content Strategy",
        description: "Creating valuable content that ranks",
        items: ["Keyword Research", "Content Planning", "SEO Writing"],
      },
      {
        title: "Link Building",
        description: "Building high-quality backlinks",
        items: ["Outreach Strategy", "Content Marketing", "Guest Posting"],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Analysis",
        description:
          "We analyze your current SEO performance and identify opportunities",
      },
      {
        step: 2,
        title: "Strategy Development",
        description:
          "Create a customized SEO strategy based on your business goals",
      },
      {
        step: 3,
        title: "Implementation",
        description: "Execute technical optimizations and content improvements",
      },
      {
        step: 4,
        title: "Monitoring & Reporting",
        description: "Track progress and provide monthly performance reports",
      },
    ],
    results: [
      {
        metric: "Organic Traffic",
        value: "+300%",
        description: "Average increase in organic visitors",
      },
      {
        metric: "Keyword Rankings",
        value: "Top 10",
        description: "Key terms ranking on first page",
      },
      {
        metric: "Conversion Rate",
        value: "+25%",
        description: "Improved lead generation",
      },
      {
        metric: "ROI",
        value: "5x",
        description: "Return on investment",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO is a long-term strategy. Initial improvements can be seen in 3-6 months, with significant results typically appearing within 6-12 months. The timeline depends on factors like competition, website age, and current optimization level.",
      },
      {
        question: "Do you offer local SEO services?",
        answer:
          "Yes, we specialize in local SEO to help businesses dominate their local markets. This includes Google Business Profile optimization, local citations, and location-specific content.",
      },
      {
        question: "How do you measure SEO success?",
        answer:
          "We track multiple KPIs including organic traffic growth, keyword rankings, conversion rates, backlink quality, and domain authority. Monthly reports provide transparent insights into your campaign performance.",
      },
      {
        question: "What makes your SEO approach different?",
        answer:
          "We focus on sustainable, white-hat SEO strategies that provide long-term value rather than quick fixes. Our data-driven approach combines technical expertise with content excellence.",
      },
    ],
    pricing: {
      starter: {
        price: "$499/mo",
        features: ["Basic SEO Audit", "50 Keywords", "Monthly Reports"],
      },
      professional: {
        price: "$999/mo",
        features: ["Full SEO Strategy", "200 Keywords", "Weekly Updates"],
      },
      enterprise: {
        price: "$2,499/mo",
        features: [
          "Comprehensive SEO",
          "Unlimited Keywords",
          "Dedicated Manager",
        ],
      },
    },
  },
  "ppc-advertising": {
    id: "ppc",
    title: "PPC Advertising",
    tagline: "Instant Traffic, Measurable Results",
    description:
      "Targeted pay-per-click campaigns that drive immediate traffic and conversions.",
    longDescription: `Our PPC management services deliver immediate results through strategic advertising campaigns across Google, Facebook, and other platforms. We optimize every dollar for maximum ROI.`,
    heroImage: "/api/placeholder/1200/600",
    icon: "📈",
    color: "from-purple-500 to-purple-600",
    features: [
      {
        title: "Campaign Strategy",
        description: "Data-driven advertising strategies",
        items: ["Audience Targeting", "Budget Allocation", "Channel Selection"],
      },
      {
        title: "Ad Creation",
        description: "Compelling ad copy and visuals",
        items: ["Copywriting", "Design", "A/B Testing"],
      },
      {
        title: "Bid Management",
        description: "Optimizing bids for best results",
        items: [
          "Automated Bidding",
          "Keyword Optimization",
          "Performance Tracking",
        ],
      },
      {
        title: "Conversion Tracking",
        description: "Measuring and optimizing conversions",
        items: ["Goal Setup", "ROI Analysis", "Funnel Optimization"],
      },
    ],
    process: [
      {
        step: 1,
        title: "Goal Setting",
        description: "Define campaign objectives and KPIs",
      },
      {
        step: 2,
        title: "Audience Research",
        description: "Identify and target your ideal customers",
      },
      {
        step: 3,
        title: "Campaign Setup",
        description: "Create and launch optimized ad campaigns",
      },
      {
        step: 4,
        title: "Ongoing Optimization",
        description: "Continuous testing and improvement",
      },
    ],
    results: [
      {
        metric: "ROAS",
        value: "8x",
        description: "Return on ad spend",
      },
      {
        metric: "Cost per Lead",
        value: "-40%",
        description: "Reduction in acquisition cost",
      },
      {
        metric: "Click-through Rate",
        value: "+150%",
        description: "Improved ad engagement",
      },
      {
        metric: "Conversion Rate",
        value: "+35%",
        description: "Higher conversion rates",
      },
    ],
    faqs: [
      {
        question: "What is your minimum budget for PPC?",
        answer:
          "We work with budgets starting from $500/month. The optimal budget depends on your industry, competition, and goals. During our consultation, we recommend a budget that maximizes ROI.",
      },
      {
        question: "Which platforms do you manage?",
        answer:
          "We manage campaigns on Google Ads, Microsoft Advertising, Facebook, Instagram, LinkedIn, and TikTok. We choose platforms based on where your target audience is most active.",
      },
      {
        question: "How do you optimize PPC campaigns?",
        answer:
          "We use continuous A/B testing, audience refinement, bid optimization, and landing page improvements. Our data-driven approach ensures every dollar is working effectively.",
      },
      {
        question: "What reporting do you provide?",
        answer:
          "We provide weekly performance updates and monthly comprehensive reports that include key metrics, insights, and recommendations for improvement.",
      },
    ],
    pricing: {
      starter: {
        price: "$750/mo",
        features: ["1 Platform", "Basic Reporting", "Monthly Optimization"],
      },
      professional: {
        price: "$1,500/mo",
        features: ["3 Platforms", "Advanced Reporting", "Weekly Optimization"],
      },
      enterprise: {
        price: "$3,000/mo",
        features: ["All Platforms", "Custom Dashboard", "Daily Optimization"],
      },
    },
  },
  "social-media-marketing": {
    id: "social-media",
    title: "Social Media Marketing",
    tagline: "Engage, Connect, Convert",
    description:
      "Build brand awareness and engagement across social media platforms.",
    longDescription: `Our social media marketing services help you build a strong online presence, engage with your audience, and drive business results through strategic content and community management.`,
    heroImage: "/api/placeholder/1200/600",
    icon: "💬",
    color: "from-pink-500 to-pink-600",
    features: [
      {
        title: "Content Strategy",
        description: "Strategic content planning and creation",
        items: ["Content Calendar", "Visual Design", "Copywriting"],
      },
      {
        title: "Community Management",
        description: "Engaging with your audience",
        items: ["Comment Response", "Message Management", "Community Building"],
      },
      {
        title: "Paid Social Advertising",
        description: "Targeted social media ads",
        items: ["Ad Campaigns", "Audience Targeting", "Performance Tracking"],
      },
      {
        title: "Analytics & Reporting",
        description: "Measuring social media performance",
        items: ["Performance Metrics", "Competitor Analysis", "ROI Tracking"],
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Analysis",
        description: "Evaluate current social media presence",
      },
      {
        step: 2,
        title: "Strategy Development",
        description: "Create platform-specific strategies",
      },
      {
        step: 3,
        title: "Content Creation",
        description: "Develop engaging content and campaigns",
      },
      {
        step: 4,
        title: "Community Engagement",
        description: "Build and nurture your audience",
      },
    ],
    results: [
      {
        metric: "Followers Growth",
        value: "+50K",
        description: "New engaged followers",
      },
      {
        metric: "Engagement Rate",
        value: "8.5%",
        description: "Higher interaction rates",
      },
      {
        metric: "Website Traffic",
        value: "+300%",
        description: "Traffic from social media",
      },
      {
        metric: "Lead Generation",
        value: "+200%",
        description: "Leads from social campaigns",
      },
    ],
    faqs: [
      {
        question: "Which social media platforms do you manage?",
        answer:
          "We manage all major platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, Pinterest, and YouTube. We recommend platforms based on where your target audience spends time.",
      },
      {
        question: "How often do you post content?",
        answer:
          "Posting frequency depends on the platform and your audience. Typically, we recommend 3-5 posts per week for Facebook/LinkedIn and 1-2 posts daily for Instagram/Twitter. We optimize based on engagement data.",
      },
      {
        question: "Do you create content or do we need to provide it?",
        answer:
          "We handle everything from content creation to publishing. Our team includes writers, designers, and video editors who create engaging content tailored to your brand voice.",
      },
      {
        question: "How do you measure social media success?",
        answer:
          "We track engagement rates, follower growth, website referrals, lead generation, and conversion rates. Success metrics are aligned with your business objectives.",
      },
    ],
    pricing: {
      starter: {
        price: "$600/mo",
        features: ["2 Platforms", "12 Posts/Month", "Basic Engagement"],
      },
      professional: {
        price: "$1,200/mo",
        features: ["4 Platforms", "24 Posts/Month", "Full Management"],
      },
      enterprise: {
        price: "$2,400/mo",
        features: ["All Platforms", "40+ Posts/Month", "Dedicated Team"],
      },
    },
  },
  "web-development": {
    id: "web-development",
    title: "Web Development",
    tagline: "Fast, Responsive, Conversion-Optimized",
    description: "Build high-performance websites that drive business growth.",
    longDescription: `Our web development services combine cutting-edge technology with conversion-focused design to create websites that not only look great but perform exceptionally well.`,
    heroImage: "/api/placeholder/1200/600",
    icon: "💻",
    color: "from-emerald-500 to-emerald-600",
    features: [
      {
        title: "Custom Development",
        description: "Tailored solutions for your business",
        items: ["React/Next.js", "Node.js", "Modern Frameworks"],
      },
      {
        title: "E-commerce Solutions",
        description: "Online stores that convert",
        items: ["Shopify", "WooCommerce", "Custom E-commerce"],
      },
      {
        title: "Performance Optimization",
        description: "Lightning-fast websites",
        items: ["Speed Optimization", "Mobile First", "Core Web Vitals"],
      },
      {
        title: "Ongoing Maintenance",
        description: "Continuous support and updates",
        items: [
          "Security Updates",
          "Performance Monitoring",
          "Content Updates",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Planning",
        description: "Understand requirements and create project plan",
      },
      {
        step: 2,
        title: "Design & Prototyping",
        description: "Create visual designs and interactive prototypes",
      },
      {
        step: 3,
        title: "Development",
        description: "Build the website with modern technologies",
      },
      {
        step: 4,
        title: "Testing & Launch",
        description: "Quality assurance and deployment",
      },
    ],
    results: [
      {
        metric: "Page Speed",
        value: "<2s",
        description: "Average load time",
      },
      {
        metric: "Conversion Rate",
        value: "+35%",
        description: "Improved conversions",
      },
      {
        metric: "Mobile Traffic",
        value: "+60%",
        description: "Mobile user growth",
      },
      {
        metric: "Bounce Rate",
        value: "-40%",
        description: "Reduced bounce rate",
      },
    ],
    faqs: [
      {
        question: "What technologies do you use?",
        answer:
          "We specialize in modern technologies including React, Next.js, Node.js, TypeScript, and headless CMS solutions. We choose the best stack for your specific needs.",
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer:
          "Yes, we offer maintenance packages that include security updates, performance monitoring, content updates, and technical support. This ensures your website remains secure and up-to-date.",
      },
      {
        question: "How long does website development take?",
        answer:
          "Timeline depends on project complexity. A simple website takes 4-6 weeks, while complex e-commerce platforms can take 8-12 weeks. We provide detailed timelines during planning.",
      },
      {
        question: "Do you offer e-commerce solutions?",
        answer:
          "Yes, we build custom e-commerce websites using Shopify, WooCommerce, or custom solutions. We focus on creating seamless shopping experiences that drive sales.",
      },
    ],
    pricing: {
      starter: {
        price: "$3,500",
        features: ["5 Pages", "Responsive Design", "Basic SEO"],
      },
      professional: {
        price: "$7,500",
        features: ["10-15 Pages", "Custom Design", "Advanced Features"],
      },
      enterprise: {
        price: "$15,000+",
        features: ["Unlimited Pages", "Full Customization", "E-commerce"],
      },
    },
  },
  "content-marketing": {
    id: "content-marketing",
    title: "Content Marketing",
    tagline: "Content That Converts",
    description:
      "Strategic content creation that drives engagement and conversions.",
    longDescription: `Our content marketing services help you build authority, engage your audience, and drive business growth through strategic content creation and distribution.`,
    heroImage: "/api/placeholder/1200/600",
    icon: "✍️",
    color: "from-orange-500 to-orange-600",
    features: [
      {
        title: "Content Strategy",
        description: "Comprehensive content planning",
        items: ["Audience Research", "Content Calendar", "Distribution Plan"],
      },
      {
        title: "Content Creation",
        description: "High-quality content production",
        items: ["Blog Writing", "Video Production", "Infographics"],
      },
      {
        title: "SEO Content",
        description: "Content optimized for search",
        items: ["Keyword Optimization", "Topic Clusters", "On-page SEO"],
      },
      {
        title: "Content Distribution",
        description: "Amplifying content reach",
        items: ["Social Promotion", "Email Marketing", "Outreach"],
      },
    ],
    process: [
      {
        step: 1,
        title: "Strategy Development",
        description: "Create content strategy aligned with business goals",
      },
      {
        step: 2,
        title: "Content Planning",
        description: "Plan topics, formats, and distribution channels",
      },
      {
        step: 3,
        title: "Content Creation",
        description: "Produce high-quality, engaging content",
      },
      {
        step: 4,
        title: "Distribution & Promotion",
        description: "Amplify content reach and engagement",
      },
    ],
    results: [
      {
        metric: "Organic Traffic",
        value: "+400%",
        description: "Traffic from content",
      },
      {
        metric: "Lead Generation",
        value: "500+/mo",
        description: "Leads from content",
      },
      {
        metric: "Domain Authority",
        value: "+20",
        description: "Improved authority score",
      },
      {
        metric: "Backlinks",
        value: "+2000",
        description: "Quality backlinks earned",
      },
    ],
    faqs: [
      {
        question: "How many blog posts do you create per month?",
        answer:
          "We recommend 4-8 blog posts per month depending on your industry and goals. Quality always trumps quantity - we focus on creating comprehensive, valuable content.",
      },
      {
        question: "Do you create other types of content?",
        answer:
          "Yes, we create videos, infographics, whitepapers, case studies, email newsletters, and social media content. We diversify content formats to reach different audience segments.",
      },
      {
        question: "How do you ensure content quality?",
        answer:
          "We have a rigorous quality process including research, writing, editing, SEO optimization, and proofreading. All content is created by experienced writers and reviewed by subject matter experts.",
      },
      {
        question: "How do you measure content marketing ROI?",
        answer:
          "We track metrics like organic traffic, keyword rankings, lead generation, conversion rates, and social engagement. We also measure brand awareness and authority improvements.",
      },
    ],
    pricing: {
      starter: {
        price: "$800/mo",
        features: ["2 Blog Posts", "Basic Strategy", "Monthly Reports"],
      },
      professional: {
        price: "$1,600/mo",
        features: ["4 Blog Posts", "Full Strategy", "Video Content"],
      },
      enterprise: {
        price: "$3,200/mo",
        features: ["8+ Blog Posts", "Comprehensive Content", "All Formats"],
      },
    },
  },
};

// Generate static paths
export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

// Generate metadata - এখানে await ব্যবহার করুন
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | Digital Marketing Services`,
    description: service.description,
    keywords: [service.title.toLowerCase(), "digital marketing", "services"],
    openGraph: {
      title: `${service.title} | NextMarketing`,
      description: service.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | NextMarketing`,
      description: service.description,
    },
  };
}

// Page component - এখানেও await ব্যবহার করুন
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceDetail service={service} />
      <RelatedServices currentServiceId={service.id} />
      <CTASection />
    </>
  );
}
