export interface Organization {
  id: string;
  name: string;
  community: string[];
  focus: string[];
  description: string;
  website: string;
  logo_keyword: string;
  image_url: string;
  neighborhood: string;
  type: string;
  industries: string[];
}

export const organizations: Organization[] = [
  {
    id: "1",
    name: "NYC Tech Collective",
    community: ["Black"],
    focus: ["Networking", "Hiring"],
    description: "Building a vibrant community of Black tech professionals through monthly meetups, career development workshops, and direct hiring partnerships with leading tech companies.",
    website: "https://example.com/nyc-tech-collective",
    logo_keyword: "technology team",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwdGVhbXxlbnwxfHx8fDE3ODA2NzY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Midtown",
    type: "Professional Network",
    industries: ["Technology"]
  },
  {
    id: "2",
    name: "Latinx in Tech",
    community: ["Latino"],
    focus: ["Panels & talks", "Workshops"],
    description: "Advancing Latino representation in technology through leadership development, mentorship programs, and advocacy for inclusive workplace cultures.",
    website: "https://example.com/latinx-in-tech",
    logo_keyword: "diverse team",
    image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbXxlbnwxfHx8fDE3ODA2NzY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Upper West Side",
    type: "Professional Network",
    industries: ["Technology", "Consulting"]
  },
  {
    id: "3",
    name: "AAPI Professionals Network",
    community: ["Asian", "South Asian"],
    focus: ["Workshops", "Networking"],
    description: "Supporting Asian American and Pacific Islander professionals across industries with skill-building workshops, executive mentorship, and community events.",
    website: "https://example.com/aapi-professionals",
    logo_keyword: "professional group",
    image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBncm91cHxlbnwxfHx8fDE3ODA2NzY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Flatiron",
    type: "Professional Network",
    industries: ["Technology", "Finance", "Healthcare"]
  },
  {
    id: "4",
    name: "Caribbean American Chamber",
    community: ["Caribbean"],
    focus: ["Career fairs", "Networking"],
    description: "Connecting Caribbean diaspora professionals with economic opportunities through business development, job placement, and entrepreneurship support.",
    website: "https://example.com/caribbean-chamber",
    logo_keyword: "business meeting",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzgwNjc2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Brooklyn",
    type: "Chamber of Commerce",
    industries: ["Finance", "Healthcare", "Government"]
  },
  {
    id: "5",
    name: "Desi Women Lead",
    community: ["South Asian"],
    focus: ["Networking", "Panels & talks"],
    description: "Empowering South Asian women in leadership through curated networking, executive coaching, and advocacy programs across finance, tech, and consulting.",
    website: "https://example.com/desi-women-lead",
    logo_keyword: "women leaders",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxlYWRlcnN8ZW58MXx8fHwxNzgwNjc2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "NoMad",
    type: "Professional Network",
    industries: ["Finance", "Technology", "Consulting"]
  },
  {
    id: "6",
    name: "Black Design Collective",
    community: ["Black", "African"],
    focus: ["Conferences", "Workshops"],
    description: "Celebrating and advancing Black designers through portfolio reviews, design thinking workshops, and annual conferences showcasing African diaspora creativity.",
    website: "https://example.com/black-design-collective",
    logo_keyword: "creative team",
    image_url: "https://images.unsplash.com/photo-1542744095-291d1f67b221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW18ZW58MXx8fHwxNzgwNjc2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Prospect Heights",
    type: "Creative Guild",
    industries: ["Design", "Marketing", "Media"]
  },
  {
    id: "7",
    name: "Middle East Innovators",
    community: ["MENA"],
    focus: ["Networking", "Workshops"],
    description: "Fostering MENA entrepreneurship through founder mixers, investor connections, and business development resources for startups and small businesses.",
    website: "https://example.com/me-innovators",
    logo_keyword: "startup team",
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbXxlbnwxfHx8fDE3ODA2NzY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Soho",
    type: "Startup Accelerator",
    industries: ["Technology"]
  },
  {
    id: "8",
    name: "Native American Coders",
    community: ["Indigenous"],
    focus: ["Fellowships", "Workshops"],
    description: "Building Indigenous representation in tech through paid fellowships, coding bootcamps, and culturally-grounded technology education programs.",
    website: "https://example.com/native-coders",
    logo_keyword: "coding education",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzgwNjc2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Online",
    type: "Education Nonprofit",
    industries: ["Technology", "Education"]
  },
  {
    id: "9",
    name: "Diversity Talent Partners",
    community: ["Black", "Latino", "Asian"],
    focus: ["Hiring", "Career fairs"],
    description: "Connecting diverse talent with top employers through curated hiring events, resume services, and recruiter partnerships across all industries.",
    website: "https://example.com/diversity-talent",
    logo_keyword: "recruitment",
    image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudHxlbnwxfHx8fDE3ODA2NzY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Times Square",
    type: "Recruiting Firm",
    industries: ["Technology", "Finance", "Consulting", "Healthcare"]
  },
  {
    id: "10",
    name: "AAPI Leadership Forum",
    community: ["Asian", "South Asian"],
    focus: ["Panels & talks", "Networking"],
    description: "Developing the next generation of AAPI leaders through executive panels, leadership training, and corporate advocacy initiatives.",
    website: "https://example.com/aapi-leadership",
    logo_keyword: "leadership conference",
    image_url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3ODA2NzY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    neighborhood: "Greenwich Village",
    type: "Leadership Nonprofit",
    industries: ["Finance", "Consulting", "Technology"]
  }
];

export const organizationTypes = [
  "Professional Network",
  "Chamber of Commerce",
  "Creative Guild",
  "Startup Accelerator",
  "Education Nonprofit",
  "Recruiting Firm",
  "Leadership Nonprofit"
];
