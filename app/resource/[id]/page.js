import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_BY_SLUG } from "@/lib/categories";
import ResourceMapLoader from "@/components/ResourceMapLoader";
import ShareButton from "@/components/ShareButton";
import ResourceFeedback from "@/components/ResourceFeedback";

// Server Component — fetches directly with the public anon key (reads are
// open on `resources` per the RLS policy in supabase/schema.sql), so this
// page works without any client-side JS and is fine for search engines too.
function getServerSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Per-resource SEO metadata (2026-11-09) — each listing gets its own title
// and description instead of inheriting the site-wide default, so search
// results and shared links show the actual resource, not just "The Help
// Haven Network" for every page.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const supabase = getServerSupabase();
  const { data: resource } = await supabase.from("resources").select("*").eq("id", id).single();

  if (!resource) {
    return { title: "Resource not found | The Help Haven Network" };
  }

  const description = resource.description
    ? resource.description.slice(0, 155)
    : `Free help in the Dallas-Fort Worth area: ${resource.name}.`;

  return {
    title: `${resource.name} | The Help Haven Network`,
    description,
    openGraph: {
      title: resource.name,
      description,
      type: "website",
    },
  };
}

export default async function ResourceDetailPage({ params }) {
  const { id } = await params;
  const supabase = getServerSupabase();

  const { data: resource, error } = await supabase.from("resources").select("*").eq("id", id).single();

  if (error || !resource) {
    notFound();
  }

  const cat = CATEGORY_BY_SLUG[resource.category];

  // schema.org structured data so search engines (and anything else that
  // reads JSON-LD) understand this page is a specific help resource, not
  // just generic text.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: resource.name,
    ...(resource.description && { description: resource.description }),
    ...(resource.phone && { telephone: resource.phone }),
    ...(resource.website && { url: resource.website }),
    ...(resource.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: resource.address,
      },
    }),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p style={{ marginBottom: 16 }}>
        <Link href="/" style={{ fontSize: 13.5 }}>
          &larr; Back to the directory
        </Link>
      </p>

      <div className="panel-block" style={{ maxWidth: 720, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <h2 style={{ fontSize: 26 }}>{resource.name}</h2>
          <span
            className="badge"
            style={{
              borderColor: "transparent",
              background: cat ? cat.tint : "var(--teal-tint)",
              color: cat ? cat.color : "var(--teal-dark)",
              textTransform: "uppercase",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            {cat ? cat.label : resource.category}
          </span>
        </div>

        <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>{resource.description}</p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}>
          {resource.verified && (
            <span className="badge" style={{ background: "var(--sage-tint)", color: "var(--sage)" }} title="Confirmed against the organization's own website">
              ✓ Verified
            </span>
          )}
          {resource.hours_247 && <span className="badge urgent">24/7</span>}
          {resource.free && <span className="badge free">Free</span>}
          {resource.area && <span className="badge">{resource.area}</span>}
        </div>

        <dl style={{ display: "grid", gridTemplateColumns: "120px 1fr", rowGap: 8, marginTop: 16, fontSize: 14 }}>
          {resource.phone && (
            <>
              <dt style={{ color: "var(--ink-soft)" }}>Call</dt>
              <dd style={{ margin: 0 }}>
                <a className="mono" href={`tel:${resource.phone.replace(/[^\d+]/g, "")}`}>
                  {resource.phone}
                </a>
              </dd>
            </>
          )}
          {resource.address && (
            <>
              <dt style={{ color: "var(--ink-soft)" }}>Address</dt>
              <dd style={{ margin: 0 }}>{resource.address}</dd>
            </>
          )}
          {resource.hours && (
            <>
              <dt style={{ color: "var(--ink-soft)" }}>Hours</dt>
              <dd style={{ margin: 0 }}>{resource.hours}</dd>
            </>
          )}
          {resource.requirements && (
            <>
              <dt style={{ color: "var(--ink-soft)" }}>Bring / needs</dt>
              <dd style={{ margin: 0 }}>{resource.requirements}</dd>
            </>
          )}
          {resource.website && (
            <>
              <dt style={{ color: "var(--ink-soft)" }}>Website</dt>
              <dd style={{ margin: 0 }}>
                <a href={resource.website} target="_blank" rel="noopener noreferrer">
                  {resource.website.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </>
          )}
        </dl>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid var(--line)",
          }}
        >
          <ResourceFeedback resourceId={resource.id} />
          <ShareButton title={resource.name} text={`${resource.name} — The Help Haven Network`} />
        </div>
      </div>

      <div style={{ maxWidth: 720 }}>
        <ResourceMapLoader resource={resource} />
      </div>
    </div>
  );
}
