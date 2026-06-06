export interface CarouselOrg {
  name: string;
  domain: string;
  logo: string;
  website: string;
}

// Logos scraped to public/org-logos/ (see scripts/fetch-carousel-logos.mjs).
export const carouselOrgs: CarouselOrg[] = [
  { name: "/dev/color", domain: "devcolor.org", logo: "/org-logos/devcolor.org.png", website: "https://devcolor.org" },
  { name: "ColorStack", domain: "colorstack.org", logo: "/org-logos/colorstack.org.png", website: "https://colorstack.org" },
  { name: "NSBE", domain: "nsbe.org", logo: "/org-logos/nsbe.org.png", website: "https://nsbe.org" },
  { name: "NABA", domain: "nabainc.org", logo: "/org-logos/nabainc.org.png", website: "https://nabainc.org" },
  { name: "AfroTech", domain: "afrotech.com", logo: "/org-logos/afrotech.com.ico", website: "https://afrotech.com" },
  { name: "MLT", domain: "mlt.org", logo: "/org-logos/mlt.org.png", website: "https://mlt.org" },
  { name: "Techqueria", domain: "techqueria.org", logo: "/org-logos/techqueria.org.png", website: "https://techqueria.org" },
  { name: "ALPFA", domain: "alpfa.org", logo: "/org-logos/alpfa.org.ico", website: "https://alpfa.org" },
  { name: "SHPE", domain: "shpe.org", logo: "/org-logos/shpe.org.png", website: "https://shpe.org" },
  { name: "Prospanica", domain: "prospanica.org", logo: "/org-logos/prospanica.org.png", website: "https://prospanica.org" },
  { name: "Latinas in Tech", domain: "latinasintech.org", logo: "/org-logos/latinasintech.org.png", website: "https://latinasintech.org" },
  { name: "Ascend", domain: "ascendleadership.org", logo: "/org-logos/ascendleadership.org.webp", website: "https://ascendleadership.org" },
  { name: "Gold House", domain: "goldhouse.org", logo: "/org-logos/goldhouse.org.png", website: "https://goldhouse.org" },
  { name: "NAAAP", domain: "naaap.org", logo: "/org-logos/naaap.org.png", website: "https://naaap.org" },
  { name: "SASE", domain: "saseconnect.org", logo: "/org-logos/saseconnect.org.png", website: "https://saseconnect.org" },
  { name: "Neythri", domain: "neythri.org", logo: "/org-logos/neythri.org.png", website: "https://neythri.org" },
  { name: "NetIP", domain: "netip.org", logo: "/org-logos/netip.org.png", website: "https://netip.org" },
  { name: "SABANY", domain: "sabany.org", logo: "/org-logos/sabany.org.webp", website: "https://sabany.org" },
  { name: "CCCADI", domain: "cccadi.org", logo: "/org-logos/cccadi.org.webp", website: "https://cccadi.org" },
  { name: "APNET", domain: "apnetny.org", logo: "/org-logos/apnetny.org.webp", website: "https://www.myapnet.org" },
  { name: "African Diaspora Network", domain: "adnconnect.org", logo: "/org-logos/adnconnect.org.png", website: "https://africandiasporanetwork.org" },
  { name: "Network of Arab-American Professionals", domain: "naapusa.org", logo: "/org-logos/naapusa.org.png", website: "https://naaponline.org" },
  { name: "AISES", domain: "aises.org", logo: "/org-logos/aises.org.png", website: "https://aises.org" },
  { name: "NEPN", domain: "nepn.org", logo: "/org-logos/nepn.org.png", website: "https://nepn.org" },
];
