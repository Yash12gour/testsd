/**
 * Content data for SpaceDesk Co-Working application.
 * All text lives here to ensure consistent copy across components.
 */

export const brandName = "SpaceDesk";

export const logo = "/logo.png";
export const logoLight = "/logo.png";
export const favicon = "/favicon.png";

export const awardText = {
  line1: "Best Co-Working",
  line2: "Space in Bhopal",
};

export const headline = {
  line1: "Coworking in Bhopal,",
  line2: "Made Simple",
};

export const subline = "Dedicated desks, private cabins and meeting rooms in Misrod, Bhopal. Fast fiber internet, full power backup and managed office.";

export const buttonLabels = {
  bookNow: "Book a Free Tour",
  readMore: "See Plans & Pricing",
  plansPricing: "See Plans & Pricing",
  login: "Login",
  bookTour: "Book a Free Tour",
  viewAvailableDates: "Check Availability",
};

export const announcementText = {
  text: "Visit us at Jaswant Tower, Misrod. Walk in, have a coffee and test the internet on your own laptop.",
  label: "Visit Us",
};

export const partnerNames = [
  "Dishika Traders",
  "Dogma Soft",
  "Tech Founders",
  "Creative Studios",
  "Remote Professionals",
  "Growing Teams",
];

export const menuItems = [
  { label: "About Us", href: "#about-page", isAboutPage: true },
  { label: "Why SpaceDesk", href: "#about" },
  { label: "Explore Spaces", href: "#spaces" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Location", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export const heroImage = "/images/hero-modern-coworking-office.jpg";

export const slides = [
  {
    type: "video",
    src: "/videos/coworking-team-meeting.mp4",
  },
];

export const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
];

export const newLocationImage = "/images/new-location-workspace.jpg";

// 1) Why Work at SpaceDesk (#about)
export const valuesSection = {
  title: "Why Work at SpaceDesk",
  seeMoreText: "See More",
  heading: "Why Work at SpaceDesk",
  description: "Everything a Bhopal freelancer, startup or growing team needs is already set up. Bring your laptop, plug in and get on with your day.",
  items: [
    {
      id: "fast-internet",
      icon: "wifi",
      title: "Fast Internet & Power Backup",
      description: "Dual fiber lines at 300 Mbps with load balancing and failover.",
      points: [
        "Dual fiber lines at 300 Mbps with load balancing and failover.",
        "A generator and online UPS keep the power on during outages.",
      ],
    },
    {
      id: "community",
      icon: "users",
      title: "A Friendly Community",
      isDark: true,
      description: "Share the space with tech founders, creative freelancers and corporate teams.",
      points: [
        "Share the space with tech founders, creative freelancers and corporate teams.",
        "A collaborative, friendly atmosphere with relaxed breakout zones.",
      ],
    },
    {
      id: "safe-secure-access",
      icon: "shield",
      title: "Safe & Secure Access",
      description: "Keycard and biometric entry with round-the-clock CCTV.",
      points: [
        "Keycard and biometric entry with round-the-clock CCTV.",
        "24/7 access for Dedicated Desk and Private Cabin members.",
      ],
    },
    {
      id: "refreshments",
      icon: "coffee",
      title: "Cafeteria & Refreshments",
      description: "Premium tea, artisanal coffee and fresh snacks inside the building.",
      points: [
        "Premium tea, artisanal coffee and fresh snacks inside the building.",
        "A break never means a trip outside.",
      ],
    },
  ],
};

// 2) Explore Spaces (#spaces)
export const spacesSection = {
  title: "Explore Our Coworking Spaces in Bhopal",
  subtitle: "From a dedicated desk to a private office for your whole team, pick the space that fits how you work.",
  featuredButtonText: "Check Availability",
  items: [
    {
      id: "dedicated-desk",
      title: "Dedicated Desk",
      description: "Your own desk, ready every morning. Ergonomic chair, locker and meeting room credits. ₹5,000 a month.",
      alt: "Desk with a laptop beside a tall window",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "private-cabin",
      title: "Private Cabin",
      description: "A lockable cabin for your small team, with acoustic privacy and a whiteboard. ₹25,000 a month.",
      alt: "Bright corridor with glass-fronted private rooms",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "private-office-suite",
      title: "Private Office Suite",
      description: "A fully customized office for growing companies and branch offices, with dedicated facility support. ₹50,000 a month.",
      alt: "Office space with glass partitions and desks",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "managed-office",
      title: "Managed Office",
      description: "A customized, fully serviced office space for growing enterprises with dedicated facility and IT support.",
      alt: "Custom managed office space with modern workstations",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "meeting-room",
      title: "Meeting Room",
      description: "A soundproof room for client pitches, team reviews and video calls, with a smart display. Ask us for rates.",
      alt: "Meeting room with a long wooden table and large windows",
      image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "conference-room",
      title: "Conference Room",
      description: "Seats up to 25 for workshops and seminars. Surround sound, dual monitors and projector support. Custom hourly rates.",
      alt: "Large open room with rows of desks and people working",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
  ],
};

// 3) Testimonials (#testimonials)
export const testimonialsSection = {
  title: "What Our Members Say",
  items: [
    {
      id: 1,
      quote: "SpaceDesk gave our team the perfect private office setup. Having fast internet, uninterrupted power, and zero daily office management headaches lets us focus completely on client requirements and daily work.",
      author: "Dishika Traders",
      role: "SpaceDesk Member",
      personImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bgImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      quote: "Handling daily transactions and partner support needs fast, uninterrupted systems. SpaceDesk gives our operations and support team a professional cabin setup, reliable power backup, and great meeting rooms to train partners and manage operations.",
      author: "Dogma Soft",
      role: "SpaceDesk Member",
      personImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bgImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 3,
      quote: "The meeting and conference rooms are fully equipped for our client presentations. Our enterprise clients are always impressed by the corporate setup.",
      author: "Regional Sales Lead",
      role: "SpaceDesk Member",
      personImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    },
  ],
};

// 4) Pricing Plan (#pricing)
export const pricingSection = {
  title: "Coworking Space Pricing in Bhopal",
  subtitle: "Simple daily and monthly plans, with no hidden charges.",
  plans: [
    {
      id: "managed-office",
      name: "Managed Office",
      tag: "For Enterprises",
      price: "₹75,000",
      period: "/month",
      targetAudience: "For growing teams and enterprises",
      buttonText: "Enquire Managed Office",
      features: [
        "Tailored private office suite",
        "High-speed enterprise Wi-Fi & backup",
        "Dedicated operations & facility manager",
        "Meeting room credits & cabins",
        "Daily housekeeping & reception support",
      ],
    },
    {
      id: "dedicated-desk",
      name: "Dedicated Desk",
      tag: "Best for Freelancers",
      price: "₹5,000",
      period: "/month",
      targetAudience: "For solo creators and remote pros",
      buttonText: "Choose Dedicated Desk",
      isHighlighted: true,
      features: [
        "Reserved desk",
        "Ergonomic chair",
        "24/7 access",
        "Meeting room credits",
        "Storage locker",
      ],
    },
    {
      id: "private-cabin",
      name: "Private Cabin",
      tag: "Private Space",
      price: "₹25,000",
      period: "/month",
      targetAudience: "For startups and small teams",
      buttonText: "Ask About Cabins",
      features: [
        "Lockable private cabin",
        "Acoustic privacy",
        "Whiteboards",
        "Space for your own branding",
        "Fast internet and power backup",
      ],
    },
  ],
};

// 5) Contact (#contact)
export const contactSection = {
  heading: "Book a Free Tour of Our Bhopal Coworking Space",
  paragraph: "Drop by for a quick tour. Walk in, have a coffee, look around and test the internet on your own laptop. No pressure, no sales pitch.",
  details: {
    phone: "+91 92329 42092",
    email: "info@spacedesk.in",
    address: "Jaswant Tower, 4th Floor, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh 462026",
    hours: "Mon to Sat, 8:00 AM to 9:00 PM",
    whatsappUrl: "https://wa.me/919232942092",
  },
  links: {
    company: {
      title: "Company",
      links: [
        { label: "About Us", href: "#about-page" },
        { label: "Membership Plans", href: "/services" },
        { label: "Contact", href: "#contact-page" },
      ],
    },
    community: {
      title: "Community",
      links: [
        { label: "Events", href: "#events-page" },
        { label: "Member Stories", href: "#testimonials" },
        { label: "Amenities", href: "#amenities-page" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Blog", href: "#blog-page" },
        { label: "FAQs", href: "#faq-page" },
        { label: "Privacy Policy", href: "#privacy" },
      ],
    },
  },
  photo: "/images/contact.jpg",
  video: "/videos/coworking-team-meeting.mp4",
  newsletterLabel: "Stay in the Loop",
  newsletterSubline: "Updates from SpaceDesk, straight to your inbox. No spam.",
  newsletterPlaceholder: "Your email address",
  companyVideoText: "Take a Video Tour",
  companyVideoSrc: "/videos/coworking-team-meeting.mp4",
  circularBadgeText: "SPACEDESK CO-WORKING • BHOPAL •",
};

// Footer
export const footerSection = {
  copyright: "© 2026 SpaceDesk Co-Working. Coworking space in Bhopal. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
  ],
};

export default {
  brandName,
  logo,
  logoLight,
  favicon,
  heroImage,
  awardText,
  headline,
  subline,
  buttonLabels,
  announcementText,
  partnerNames,
  menuItems,
  slides,
  avatars,
  newLocationImage,
  valuesSection,
  spacesSection,
  testimonialsSection,
  pricingSection,
  contactSection,
  footerSection,
};
