export interface CarouselOrg {
  name: string;
  domain: string;
  logo: string;
}

// Logos scraped to public/org-logos/ (see scripts/fetch-carousel-logos.mjs).
export const carouselOrgs: CarouselOrg[] = [
  { name: "/dev/color", domain: "devcolor.org", logo: "/org-logos/devcolor.org.png" },
  { name: "ColorStack", domain: "colorstack.org", logo: "/org-logos/colorstack.org.png" },
  { name: "NSBE", domain: "nsbe.org", logo: "/org-logos/nsbe.org.png" },
  { name: "NABA", domain: "nabainc.org", logo: "/org-logos/nabainc.org.png" },
  { name: "AfroTech", domain: "afrotech.com", logo: "/org-logos/afrotech.com.ico" },
  { name: "MLT", domain: "mlt.org", logo: "/org-logos/mlt.org.png" },
  { name: "Techqueria", domain: "techqueria.org", logo: "/org-logos/techqueria.org.png" },
  { name: "ALPFA", domain: "alpfa.org", logo: "/org-logos/alpfa.org.ico" },
  { name: "SHPE", domain: "shpe.org", logo: "/org-logos/shpe.org.png" },
  { name: "Prospanica", domain: "prospanica.org", logo: "/org-logos/prospanica.org.png" },
  { name: "Latinas in Tech", domain: "latinasintech.org", logo: "/org-logos/latinasintech.org.png" },
  { name: "Ascend", domain: "ascendleadership.org", logo: "/org-logos/ascendleadership.org.webp" },
  { name: "Gold House", domain: "goldhouse.org", logo: "/org-logos/goldhouse.org.png" },
  { name: "NAAAP", domain: "naaap.org", logo: "/org-logos/naaap.org.png" },
  { name: "SASE", domain: "saseconnect.org", logo: "/org-logos/saseconnect.org.png" },
  { name: "Neythri", domain: "neythri.org", logo: "/org-logos/neythri.org.png" },
  { name: "NetIP", domain: "netip.org", logo: "/org-logos/netip.org.png" },
  { name: "SABANY", domain: "sabany.org", logo: "/org-logos/sabany.org.webp" },
  { name: "CCCADI", domain: "cccadi.org", logo: "/org-logos/cccadi.org.webp" },
  { name: "APNET", domain: "apnetny.org", logo: "/org-logos/apnetny.org.webp" },
  { name: "African Diaspora Network", domain: "adnconnect.org", logo: "/org-logos/adnconnect.org.png" },
  { name: "Network of Arab-American Professionals", domain: "naapusa.org", logo: "/org-logos/naapusa.org.png" },
  { name: "AISES", domain: "aises.org", logo: "/org-logos/aises.org.png" },
  { name: "NEPN", domain: "nepn.org", logo: "/org-logos/nepn.org.png" },
];
