"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { matchesZip, ZIP_SEARCH_RADIUS_MILES } from "@/lib/zip";
import { CATEGORY_BY_SLUG, ALL_CATEGORY } from "@/lib/categories";
import CategoryRail from "@/components/CategoryRail";
import ResourceCard from "@/components/ResourceCard";
import CategoryIcon from "@/lib/categoryIcons";

// ssr:false is only legal inside a Client Component — this file is one
// ("use client" above) precisely so the map can be loaded this way.
const ResourceMap = dynamic(() => import("@/components/ResourceMap"), {
  ssr: false,
  loading: () => (
    <div className="map-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-soft)" }}>
      Loading map…
    </div>
  ),
});

// Resources shown per page in the grid below. 16 = 4 rows of the 4-column
// grid at desktop width, so a page never runs past a glance-able number of
// rows before "Next" kicks in.
const PAGE_SIZE = 16;

// Shared client logic for both /browse (all categories, query-string
// filtering) and /browse/[category] (one category per URL, for real
// per-category indexing). The server page passes `initialCategory` (from
// the path segment, when present) and `initialResources` (fetched
// server-side, so the first paint already has real listings instead of an
// empty list waiting on a client-side fetch).
export default function BrowseClient({ initialCategory, initialResources = [] }) {
  return (
    <Suspense fallback={null}>
      <BrowseResults initialCategory={initialCategory} initialResources={initialResources} />
    </Suspense>
  );
}

function BrowseResults({ initialCategory, initialResources }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // A path-based category (/browse/crisis) wins by default; ?category= in
  // the query string still works too, so old /browse?category=... links
  // people may have saved or shared keep working.
  const activeCat = searchParams.get("category") || initialCategory || "all";
  const zip = searchParams.get("zip") || "";
  const detoxOnly = searchParams.get("detox") === "1";

  const activeCategoryInfo = CATEGORY_BY_SLUG[activeCat] || ALL_CATEGORY;

  const [resources, setResources] = useState(initialResources);
  const [loading, setLoading] = useState(initialResources.length === 0);
  const [loadError, setLoadError] = useState(null);
  const [query, setQuery] = useState("");
  const [zipInput, setZipInput] = useState(zip);
  const [selectedId, setSelectedId] = useState(null);
  const [zipCenter, setZipCenter] = useState(null);
  const [zipLocating, setZipLocating] = useState(false);
  const [page, setPage] = useState(1);
  const resultsRef = useRef(null);

  useEffect(() => {
    setZipInput(zip);
  }, [zip]);

  // Turn the searched ZIP into a center point once, so nearby (not just
  // exact-match) resources can be found and pinned on the map.
  useEffect(() => {
    if (!zip) {
      setZipCenter(null);
      return;
    }
    let cancelled = false;
    setZipLocating(true);
    fetch(`/api/geocode?address=${encodeURIComponent(`${zip}, USA`)}`)
      .then((res) => res.json())
      .then((coords) => {
        if (cancelled) return;
        setZipCenter(coords && typeof coords.lat === "number" ? coords : null);
      })
      .catch(() => {
        if (!cancelled) setZipCenter(null);
      })
      .finally(() => {
        if (!cancelled) setZipLocating(false);
      });
    return () => {
      cancelled = true;
    };
  }, [zip]);

  // Re-fetch on mount to stay fresh even though `resources` may already be
  // seeded from the server-rendered initial list.
  useEffect(() => {
    let cancelled = false;

    supabase
      .from("resources")
      .select("*")
      .order("name", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setLoadError(error.message);
        } else {
          setResources(data || []);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (activeCat !== "all" && r.category !== activeCat) return false;
      if (detoxOnly && !r.offers_detox) return false;
      if (!matchesZip(r, zip, zipCenter)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        r.name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.area?.toLowerCase().includes(q)
      );
    });
  }, [resources, activeCat, detoxOnly, zip, zipCenter, query]);

  // Jump back to page 1 whenever the filtered set changes shape — paging
  // stays meaningless (or points past the end) otherwise once someone
  // switches category, types a search, or changes the ZIP.
  useEffect(() => {
    setPage(1);
  }, [activeCat, detoxOnly, zip, zipCenter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goToPage(p) {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const basePath = activeCat !== "all" ? `/browse/${activeCat}` : "/browse";

  // Detox is a real, non-obvious need buried inside "Substance Abuse &
  // Recovery" — some of those listings offer it, most don't, and there's no
  // separate category for it (it's a service a recovery org offers, not a
  // distinct type of org). This toggle is how someone finds "who actually
  // does detox" without reading every card's description.
  function toggleDetoxOnly() {
    const params = new URLSearchParams(searchParams.toString());
    // Category now lives in the path (basePath), not the query string.
    params.delete("category");
    if (detoxOnly) {
      params.delete("detox");
    } else {
      params.set("detox", "1");
    }
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  return (
    <div>
      <CategoryRail activeCategory={activeCat} zip={zip} detoxOnly={detoxOnly} onToggleDetox={toggleDetoxOnly} />

      {/* Height trimmed roughly in half (2026-11-08) via inline overrides
          scoped to just this instance — the shared .hero-panel class in
          globals.css is untouched, so the homepage hero and the About/Add
          pages (which also use that class) keep their original size. */}
      <div
        className="hero-panel"
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          padding: "14px 20px",
        }}
      >
        <span style={{ lineHeight: 1, color: "var(--teal)" }} aria-hidden="true">
          <CategoryIcon slug={activeCategoryInfo.slug} size={22} />
        </span>
        <div>
          <h2 style={{ fontSize: 16, marginBottom: 2 }}>{activeCategoryInfo.label}</h2>
          <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: 12.5 }}>
            Search by name or need below, or filter by ZIP — the map is further down, under the listings.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="search"
          placeholder="Search by name, service, or need…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: "2 1 220px", minWidth: 200 }}
        />
        <form action={basePath} method="GET" style={{ display: "flex", gap: 8, flex: "1 1 220px" }}>
          <input
            name="zip"
            inputMode="numeric"
            pattern="\d{5}"
            maxLength={5}
            placeholder="ZIP code"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            style={{ flex: 1, minWidth: 120 }}
          />
          <button className="btn" style={{ background: "var(--panel)", border: "1px solid var(--line)", flex: "none" }} type="submit">
            {zip ? "Update" : "Find Nearby"}
          </button>
          {zip && (
            <a href={basePath} className="btn" style={{ background: "transparent", border: "1px solid var(--line)", flex: "none" }}>
              Clear ZIP
            </a>
          )}
        </form>
      </div>

      {zip && (
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>
          {zipLocating
            ? `Locating ${zip}…`
            : zipCenter
            ? `Showing resources within ${ZIP_SEARCH_RADIUS_MILES} miles of ${zip}, plus phone/text lines and statewide services that aren't tied to one address.`
            : `Showing resources located in ${zip}, plus phone/text lines and statewide services that aren't tied to one address.`}
        </p>
      )}

      {loadError && (
        <div className="form-msg err" style={{ marginBottom: 16 }}>
          Couldn&apos;t load the directory: {loadError}. Double-check your Supabase env vars in .env.local.
        </div>
      )}

      <div ref={resultsRef} className="resource-grid" style={{ marginBottom: 20 }}>
        {!loading && filtered.length === 0 && (
          <div className="empty">
            {detoxOnly
              ? 'No detox-offering listings match your other filters yet. Try clearing the ZIP or category filter.'
              : zip
              ? `No resources found in ${zip} yet. Try a nearby ZIP, or use "Add a Resource" to add one.`
              : 'No resources match yet. Try a different search, or use "Add a Resource" to add one.'}
          </div>
        )}
        {pageItems.map((r) => (
          <ResourceCard key={r.id} resource={r} onSelect={setSelectedId} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination" style={{ marginBottom: 28 }}>
          <button
            type="button"
            className="btn"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
          >
            ← Previous
          </button>
          <span className="pagination-status">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            className="btn"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      <h3 style={{ fontSize: 15, marginBottom: 10, color: "var(--ink-soft)" }}>Map view</h3>
      <ResourceMap resources={filtered} selectedId={selectedId} onSelect={setSelectedId} />
    </div>
  );
}
