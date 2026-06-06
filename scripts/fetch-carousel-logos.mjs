import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ORGS = [
  { name: "/dev/color", domain: "devcolor.org" },
  { name: "ColorStack", domain: "colorstack.org" },
  { name: "NSBE", domain: "nsbe.org" },
  { name: "NABA", domain: "nabainc.org" },
  { name: "AfroTech", domain: "afrotech.com" },
  { name: "MLT", domain: "mlt.org" },
  { name: "Techqueria", domain: "techqueria.org" },
  { name: "ALPFA", domain: "alpfa.org" },
  { name: "SHPE", domain: "shpe.org" },
  { name: "Prospanica", domain: "prospanica.org" },
  { name: "Latinas in Tech", domain: "latinasintech.org" },
  { name: "Ascend", domain: "ascendleadership.org" },
  { name: "Gold House", domain: "goldhouse.org" },
  { name: "NAAAP", domain: "naaap.org" },
  { name: "SASE", domain: "saseconnect.org" },
  { name: "Neythri", domain: "neythri.org" },
  { name: "NetIP", domain: "netip.org" },
  { name: "SABANY", domain: "sabany.org" },
  { name: "CCCADI", domain: "cccadi.org" },
  { name: "APNET", domain: "apnetny.org" },
  { name: "African Diaspora Network", domain: "adnconnect.org" },
  { name: "Network of Arab-American Professionals", domain: "naapusa.org" },
  { name: "AISES", domain: "aises.org" },
  { name: "NEPN", domain: "nepn.org" },
];

const OUT_DIR = join(process.cwd(), "public/org-logos");

const SOURCES = (domain) => [
  { url: `https://logo.clearbit.com/${domain}`, ext: "png" },
  { url: `https://icons.duckduckgo.com/ip3/${domain}.ico`, ext: "ico" },
  {
    url: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    ext: "png",
  },
];

async function fetchLogo(domain) {
  for (const source of SOURCES(domain)) {
    try {
      const res = await fetch(source.url, {
        redirect: "follow",
        headers: { "User-Agent": "DiasporaLogoFetcher/1.0" },
      });
      if (!res.ok) continue;

      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) continue;

      const contentType = res.headers.get("content-type") ?? "";
      let ext = source.ext;
      if (contentType.includes("svg")) ext = "svg";
      else if (contentType.includes("jpeg") || contentType.includes("jpg")) ext = "jpg";
      else if (contentType.includes("webp")) ext = "webp";
      else if (contentType.includes("png")) ext = "png";

      return { buf, ext, source: source.url };
    } catch {
      // try next source
    }
  }
  return null;
}

const manifest = [];

await mkdir(OUT_DIR, { recursive: true });

for (const org of ORGS) {
  process.stdout.write(`Fetching ${org.domain}… `);
  const result = await fetchLogo(org.domain);
  if (!result) {
    console.log("FAILED");
    manifest.push({ ...org, logo: null, status: "failed" });
    continue;
  }

  const filename = `${org.domain}.${result.ext}`;
  await writeFile(join(OUT_DIR, filename), result.buf);
  console.log(`OK (${result.ext}, ${result.buf.length} bytes)`);
  manifest.push({
    ...org,
    logo: `/org-logos/${filename}`,
    status: "ok",
    source: result.source,
  });
}

await writeFile(
  join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

const ok = manifest.filter((m) => m.status === "ok").length;
console.log(`\nDone: ${ok}/${ORGS.length} logos saved to public/org-logos/`);
