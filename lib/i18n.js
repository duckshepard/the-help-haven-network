// Spanish/English UI dictionary (task 7, 2026-11-09) — site chrome and
// static pages only (nav, crisis bar, footer, homepage, About/Privacy/
// Terms, category labels, form labels, and the /browse page's own UI
// text). Resource listing content itself (names, descriptions,
// requirements) is translated separately — see lib/categories.js for
// per-category label_es/pill_es fields, and the resources table's
// description_es column (task 8) for listing-level translation.
//
// t(key, vars) in LanguageProvider.js resolves a dotted path ("nav.browse")
// against the dictionary for the current language, falling back to English
// for any missing key so a half-translated addition never renders blank.
// {{token}} placeholders inside a string are replaced from the `vars`
// object passed to t().
export const translations = {
  en: {
    nav: {
      browse: "Browse",
      add: "Add a Resource",
      about: "About",
      share: "Share",
      volunteer: "Volunteer & Donate",
      suggestions: "Suggestions",
    },
    tagline: "Community resource directory",
    langToggle: {
      switchTo: "Español",
      srLabel: "Switch to Spanish",
    },
    crisisBar: {
      prefix: "In crisis right now?",
      call988: "Call or text 988",
      call988Label: "(Suicide & Crisis Lifeline)",
      call211: "Call 211",
      call211Label: "(local resources, 24/7)",
    },
    adBanner: {
      text: "Sponsor space available. This spot is reserved for a community partner.",
      cta: "Inquire about sponsoring →",
    },
    footer: {
      disclaimer:
        "Informational directory only — not a substitute for professional medical, legal, or crisis care. If you or someone else is in immediate danger, call 911. Listings are community-sourced and reviewed, but always confirm hours and eligibility directly with the organization.",
      accessibility: "Accessibility",
      privacy: "Privacy",
      terms: "Terms",
      admin: "Admin",
    },
    home: {
      heroTitle: "Helping North Texas — and growing",
      heroSubtitle:
        "Pick a category below to get started, or browse everything at once — search and ZIP filtering are on the next page. For 24/7 crisis and social-service referrals anywhere in the country, you can also dial 211.",
      missionTitle: "Why we're doing this",
      missionBody:
        "We started The Help Haven Network to do the next right thing — because finding help shouldn't be its own crisis. Right now we're new, small, and built mostly by hand, so we know we're limited in how much ground we cover. But we're not staying small. Every resource we add and every listing we verify is a step toward a directory that reaches city after city, until help is never more than a search away, no matter where someone is. If this page gets even one person to the next right thing, it was worth building.",
    },
    about: {
      title: "About The Help Haven Network",
      p1a:
        "The Help Haven Network is a directory of mental health, substance abuse recovery, shelter, domestic violence, LGBTQ+, military and first responder, legal aid, financial assistance, human trafficking, food assistance, and clothing/essentials resources. It started in North Texas, with the goal of growing city by city — and eventually nationwide. New here and not sure where to start? Call",
      p1b:
        "(211 Texas) — it connects you to local health and human services of every kind, and is the best first call if you don't know where else to look.",
      p2:
        "Anyone can search the directory for free. Anyone can also submit a resource — including organizations listing themselves directly — and every submission is reviewed before it goes live, to keep listings accurate and to keep bad actors out.",
      p3:
        "The Help Haven Network is built for, and by, people who have needed resources like these and had trouble finding them — and who took hard falls because of that gap. It exists so the next person looking doesn't have to search as hard, or fall as far, to find help.",
      disclaimerStrong: "This is an informational directory only.",
      disclaimerRest:
        " It is not a substitute for professional medical, legal, or crisis care. If you or someone else is in immediate danger, call 911. Listings are community-sourced and reviewed, but hours and eligibility can change — always confirm directly with the organization before you go.",
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "The Help Haven Network (operated by Nisus Concepts LLC, a Texas limited liability company — \"we,\" \"us\") is a directory, not a data company. This page explains, in plain terms, what we actually collect when you use this site, why, and who else sees it.",
      lastUpdated: "Last updated: September 2026.",
      machineTranslatedNotice:
        "This Spanish translation was produced by machine translation. The English version is the authoritative text; if anything here is unclear or seems to conflict with it, please refer to the English page or contact us.",
      sections: [
        {
          key: "shortVersion",
          title: "The short version",
          body:
            "You don't need an account to search this directory. We don't run ads, sell data, or use third-party analytics or ad trackers. The only accounts on this site belong to the small team that reviews submissions. What follows is the full detail behind that summary.",
        },
        {
          key: "infoYouProvide",
          title: "Information you provide",
          body:
            "We collect personal information through four forms on this site. The Suggestions form and the Volunteer & Donate form collect your name, email, and (for Volunteer & Donate) phone number, plus whatever message you write. The resource feedback widget on each listing collects a yes/no accuracy flag and an optional free-text note. If you use the \"Add a Resource\" form, we collect whatever you type into it: an organization's name, category, description, phone number, city/region, address, hours, eligibility requirements, website, and an optional note to the reviewer, plus whether you're submitting as an individual or on an organization's behalf. The form does not ask for your own name, email, or phone number — we don't know who submitted something unless you choose to say so in the note field. Whatever you do submit is stored in our database and reviewed by an admin before anything goes live; we may edit a submission for clarity or accuracy before publishing it.",
        },
        {
          key: "autoCollected",
          title: "Automatically collected information",
          body:
            "We keep an anonymous, minimal visit log — just the page path and a timestamp, nothing that identifies you — kept admin-only on the internal review dashboard; there's no public visit counter on the site. A small marker in your browser's session storage (not a cookie, and not shared across sites) prevents that count from inflating every time you load a new page in the same visit; it disappears when you close the tab.\n\nSeparately, our hosting and database providers (Vercel and Supabase, below) generate their own standard infrastructure logs — the kind any web host keeps for security and reliability — which can include IP addresses. We don't access or use those logs ourselves; they exist at the infrastructure layer, governed by those providers' own privacy practices.",
        },
        {
          key: "mapAndSearch",
          title: "The map and search",
          body:
            "The map on the browse pages loads tiles directly from OpenStreetMap's tile servers, and a ZIP code you search with is sent to OpenStreetMap's Nominatim geocoding service (through our own server, not directly from your browser) to translate it into a map location. Neither exchange includes your name or any account information — there isn't one — but loading any third-party map tile or geocoding request works like loading any other image or resource from across the web: the provider's own server sees the request, including your IP address, under its own policies.",
        },
        {
          key: "fonts",
          title: "Fonts",
          body:
            "The site's typefaces are loaded from Google Fonts and jsDelivr, two widely used content delivery networks. Like any font or script loaded from a CDN, your browser makes a direct request to their servers, subject to their own standard logging practices — no site login or personal data is involved.",
        },
        {
          key: "adminAccounts",
          title: "Admin accounts",
          body:
            "The site's review team signs in through Supabase Authentication (email and password). That login system is Supabase's, not ours to inspect — we never see or store a plaintext password. This applies only to the small internal review team; the public never needs an account to use this site.",
        },
        {
          key: "whoWeShare",
          title: "Who we share information with",
          body:
            "We don't sell, rent, or trade any information collected through this site. The only parties who process it are the infrastructure we run on — Supabase (database and authentication), Vercel (hosting), OpenStreetMap (map tiles and geocoding), and Google Fonts / jsDelivr (font delivery) — each acting as a service provider, not an independent user of your data. Published resource listings are, by design, public and visible to anyone who visits the site; that's the whole point of a directory.",
        },
        {
          key: "childrens",
          title: "Children's privacy",
          body:
            "This directory includes resources relevant to people of any age, including minors seeking help (for example, LGBTQ+ or domestic-violence support). Browsing and searching the directory require no personal information from anyone. We don't knowingly collect personal information from children through the submission form, and we ask that submitters not include a minor's personal details in a note or description. If you believe a submission contains a child's personal information, contact us below and we'll remove it.",
        },
        {
          key: "yourChoices",
          title: "Your choices",
          body:
            "Since we don't collect contact information from public users, there's no account or marketing list to opt out of. If you submitted a resource and want it corrected, updated, or taken down — whether it's your own organization's listing or one you flagged as inaccurate — email us at nisusconcepts@gmail.com and we'll act on it.",
        },
        {
          key: "changes",
          title: "Changes to this policy",
          body:
            "If how we handle data changes in a meaningful way, we'll update this page and the \"last updated\" date at the top. We don't send notices for routine wording clarifications.",
        },
        {
          key: "contact",
          title: "Contact",
          body:
            "Questions about this policy, or about information tied to a specific submission, go to nisusconcepts@gmail.com.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      intro:
        "These terms govern your use of The Help Haven Network (operated by Nisus Concepts LLC, a Texas limited liability company — \"we,\" \"us\"). By browsing this site or submitting a resource, you agree to them.",
      lastUpdated: "Last updated: September 2026.",
      machineTranslatedNotice:
        "This Spanish translation was produced by machine translation. The English version is the authoritative text; if anything here is unclear or seems to conflict with it, please refer to the English page or contact us.",
      sections: [
        {
          key: "whatThisIs",
          title: "What this site is",
          body:
            "The Help Haven Network is an informational directory of mental health, recovery, shelter, and other support resources. It is not a substitute for professional medical, legal, or crisis care, and it is not itself a crisis service. If you or someone else is in immediate danger, call 911. We are not affiliated with, and do not control, any organization listed in the directory.",
        },
        {
          key: "noGuarantee",
          title: "No guarantee of accuracy",
          body:
            "Listings are community-sourced and reviewed before publishing, but organizations change hours, eligibility, staff, and services without telling us. A \"Verified\" badge means an admin or our automated check found the listed phone number or address on the organization's own website at some point — it's a heuristic, not a guarantee, and a missing badge doesn't mean a listing is wrong. Always confirm hours, eligibility, and availability directly with the organization before relying on a listing.",
        },
        {
          key: "submitting",
          title: "Submitting a resource",
          body:
            "Anyone may submit a resource, including an organization submitting its own listing. By submitting, you confirm the information is accurate to the best of your knowledge and that you have the right to share it, and you grant us a non-exclusive, royalty-free right to publish, display, and edit it (for clarity, formatting, or accuracy) on this site. We review every submission before publishing and may reject, edit, or later remove any listing at our discretion — including one that is inaccurate, misleading, spam, or otherwise inappropriate for a directory serving people in vulnerable situations. Submitting a resource does not guarantee it will be published, and does not create any business relationship between you and us.",
        },
        {
          key: "acceptableUse",
          title: "Acceptable use",
          body:
            "Don't use this site to submit false, fraudulent, or misleading information; to spam, scrape at scale, or attempt to bypass the form's anti-spam protections; to impersonate an organization you're not authorized to represent; or to submit anything illegal, abusive, or that could put a vulnerable person at risk. We may block access or remove content from anyone who violates this.",
        },
        {
          key: "thirdParty",
          title: "Third-party organizations and links",
          body:
            "Listings link to or describe services run by independent third parties. Using any listed organization's services is between you and that organization, governed by their own policies — not ours. We're not responsible for the conduct, content, or services of any organization listed here, and listing an organization is not an endorsement of it beyond what our review process confirms (accuracy of the contact information, not quality of care).",
        },
        {
          key: "ip",
          title: "Intellectual property",
          body:
            "The site's design, code, and original written content belong to Nisus Concepts LLC. Submitted listing content remains the submitter's (or the organization's), shared with us under the license above. You may share links to this site or quote a listing for personal, non-commercial reference; you may not scrape or republish the directory as your own without our permission.",
        },
        {
          key: "noWarranty",
          title: "No warranty",
          body:
            "This site is provided \"as is,\" without warranties of any kind, express or implied, including accuracy, availability, or fitness for a particular purpose. We do our best to keep listings current and the site running, but we don't guarantee either.",
        },
        {
          key: "liability",
          title: "Limitation of liability",
          body:
            "To the fullest extent permitted by law, Nisus Concepts LLC and The Help Haven Network are not liable for any damages arising from your use of this site or your reliance on any listed information — including harm caused by an inaccurate listing, an organization's own conduct, or a service interruption. Nothing here limits liability where the law doesn't allow it to be limited.",
        },
        {
          key: "changes",
          title: "Changes",
          body:
            "We may update these terms as the site changes. Material changes will update the \"last updated\" date above; continuing to use the site after a change means you accept the updated terms.",
        },
        {
          key: "governingLaw",
          title: "Governing law",
          body:
            "These terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles.",
        },
        {
          key: "contact",
          title: "Contact",
          body:
            "Questions about these terms, or a listing you believe violates them, go to nisusconcepts@gmail.com.",
        },
      ],
    },
    categoryRail: {
      detoxToggle: "Only show places that offer detox",
    },
    browse: {
      subtitle: "Search by name or need below, or filter by ZIP — the map is further down, under the listings.",
      searchPlaceholder: "Search by name, service, or need…",
      zipPlaceholder: "ZIP code",
      findNearby: "Find Nearby",
      update: "Update",
      clearZip: "Clear ZIP",
      locating: "Locating {{zip}}…",
      showingNear: "Showing resources within {{radius}} miles of {{zip}}, plus phone/text lines and statewide services that aren't tied to one address.",
      showingIn: "Showing resources located in {{zip}}, plus phone/text lines and statewide services that aren't tied to one address.",
      loadError: "Couldn't load the directory: {{error}}. Double-check your Supabase env vars in .env.local.",
      resourcesMatch: "{{count}} resource{{plural}} match",
      printList: "🖨 Print this list",
      emptyDetox: "No detox-offering listings match your other filters yet. Try clearing the ZIP or category filter.",
      emptyZip: "No resources found in {{zip}} yet. Try a nearby ZIP, or use \"Add a Resource\" to add one.",
      emptyDefault: "No resources match yet. Try a different search, or use \"Add a Resource\" to add one.",
      prevPage: "← Previous",
      nextPage: "Next →",
      pageStatus: "Page {{page}} of {{total}}",
      printTitle: "The Help Haven Network",
      printedOn: "printed {{date}}",
      printNear: "near {{zip}}",
      printEmpty: "No resources match this search.",
      printFree: "(Free)",
      print247: "(24/7)",
      mapView: "Map view",
      loadingMap: "Loading map…",
    },
    suggestions: {
      title: "Suggestions",
      subtitle:
        "This site only gets better with input from the people actually using it. Missing a resource, found something confusing, or have an idea that would make this easier to use? Tell us below — contact info is optional, but if you leave an email we may follow up.",
      messageLabel: "Your suggestion",
      messagePlaceholder: "What would make this site more helpful?",
      nameLabel: "Name (optional)",
      emailLabel: "Email (optional)",
      emailPlaceholder: "Only if you'd like a reply",
      submit: "Send suggestion",
      submitting: "Sending…",
      errPrefix: "Something went wrong ({{error}}). Please try again.",
      ok: "Thank you — we read every suggestion, and it genuinely shapes what we build next.",
    },
    add: {
      title: "Add a resource",
      subtitle:
        "Know a service that should be listed — or run one yourself? Organizations are welcome to add their own listing directly. Every submission is reviewed before it goes live, which keeps the directory accurate and safe.",
      whoLabel: "Who's submitting this?",
      whoIndividual: "I found this resource",
      whoOrg: "I represent this organization",
      orgContactHint: "Since you're submitting on behalf of this organization, please include a phone number or website below so we can verify the listing.",
      orgContactRequired: "Please provide a phone number or website so we can verify this organization's listing.",
      nameLabel: "Organization name",
      categoryLabel: "Category",
      descLabel: "What do they help with?",
      descPlaceholder: "Short description of services offered",
      phoneLabel: "Phone",
      phonePlaceholder: "(xxx) xxx-xxxx",
      areaLabel: "City / region",
      areaPlaceholder: "e.g. Fort Worth, TX",
      addressLabel: "Address",
      addressPlaceholder: "Street, city, ZIP",
      hoursLabel: "Hours / days open",
      hoursPlaceholder: "e.g. Mon-Fri 9am-3pm, closed Sun",
      requirementsLabel: "Requirements to receive services (optional)",
      requirementsPlaceholder: "e.g. photo ID, proof of address, appointment needed, income limits",
      websiteLabel: "Website (optional)",
      noteLabel: "Anything else the reviewer should know? (optional)",
      submit: "Submit for review",
      submitting: "Submitting…",
      errPrefix: "Something went wrong ({{error}}). Please try again.",
      ok: "Thanks — this will be reviewed before it appears in the directory.",
    },
    volunteer: {
      heroTitle: "Volunteer & Donate",
      heroSubtitle:
        "The Help Haven Network runs on volunteer time and community support. If you've got an hour or a skill to offer, or want to support the work directly, here's how.",
      sectionTitle: "Volunteer with us",
      sectionBody:
        "We're a new, small operation, so volunteer help goes a long way — verifying listings, researching new resources, spreading the word, or just telling us what's missing. Tell us a bit about yourself and we'll follow up.",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone (optional)",
      messageLabel: "How would you like to help? (optional)",
      messagePlaceholder: "Skills, availability, what you're interested in...",
      submit: "Sign up to volunteer",
      submitting: "Sending…",
      errPrefix: "Something went wrong ({{error}}). Please try again.",
      ok: "Thank you — we'll be in touch about ways to help.",
      donateTitle: "Donate",
      donateBody:
        "We're setting up a way to accept donations directly — check back soon. In the meantime, if you'd like to support the directory financially, {{link}} and we'll follow up.",
      donateLink: "reach out by email",
    },
    resourceFeedback: {
      question: "Still accurate?",
      yes: "Yes",
      no: "No",
      notePrompt: "What's changed? (optional)",
      notePlaceholder: "e.g. phone number disconnected, moved locations...",
      submit: "Submit",
      submitting: "Sending…",
      thanks: "Thanks for letting us know — this helps keep the directory accurate.",
    },
    shareButton: {
      share: "Share this resource",
      copied: "Link copied!",
    },
  },
  es: {
    nav: {
      browse: "Buscar",
      add: "Agregar un recurso",
      about: "Acerca de",
      share: "Compartir",
      volunteer: "Voluntariado y donaciones",
      suggestions: "Sugerencias",
    },
    tagline: "Directorio comunitario de recursos",
    langToggle: {
      switchTo: "English",
      srLabel: "Cambiar a inglés",
    },
    crisisBar: {
      prefix: "¿Estás en crisis en este momento?",
      call988: "Llama o envía un mensaje de texto al 988",
      call988Label: "(Línea de Crisis y Suicidio)",
      call211: "Llama al 211",
      call211Label: "(recursos locales, 24/7)",
    },
    adBanner: {
      text: "Espacio de patrocinio disponible. Este espacio está reservado para un socio comunitario.",
      cta: "Pregunta sobre patrocinios →",
    },
    footer: {
      disclaimer:
        "Este es solo un directorio informativo, no sustituye la atención médica, legal o de crisis profesional. Si tú o alguien más está en peligro inmediato, llama al 911. Las listas son aportadas por la comunidad y revisadas, pero siempre confirma el horario y los requisitos directamente con la organización.",
      accessibility: "Accesibilidad",
      privacy: "Privacidad",
      terms: "Términos",
      admin: "Administración",
    },
    home: {
      heroTitle: "Ayudando al norte de Texas — y creciendo",
      heroSubtitle:
        "Elige una categoría abajo para empezar, o explora todo a la vez — la búsqueda y el filtro por código postal están en la siguiente página. Para referencias de crisis y servicios sociales las 24 horas en cualquier parte del país, también puedes llamar al 211.",
      missionTitle: "Por qué hacemos esto",
      missionBody:
        "Creamos The Help Haven Network para hacer lo correcto — porque encontrar ayuda no debería ser otra crisis más. Por ahora somos nuevos, pequeños y construidos casi a mano, así que sabemos que tenemos un alcance limitado. Pero no nos quedaremos pequeños. Cada recurso que agregamos y cada listado que verificamos es un paso hacia un directorio que llegue a ciudad tras ciudad, hasta que la ayuda nunca esté a más de una búsqueda de distancia, sin importar dónde esté alguien. Si esta página ayuda a una sola persona a dar el siguiente paso correcto, valió la pena construirla.",
    },
    about: {
      title: "Acerca de The Help Haven Network",
      p1a:
        "The Help Haven Network es un directorio de recursos de salud mental, recuperación de abuso de sustancias, refugio, violencia doméstica, LGBTQ+, apoyo militar y para primeros respondientes, asistencia legal, asistencia financiera, trata de personas, asistencia alimentaria y ropa/artículos esenciales. Comenzó en el norte de Texas, con la meta de crecer ciudad por ciudad — y eventualmente a nivel nacional. ¿Eres nuevo aquí y no sabes por dónde empezar? Llama al",
      p1b:
        "(211 Texas) — te conecta con servicios de salud y humanos locales de todo tipo, y es la mejor primera llamada si no sabes a dónde más buscar.",
      p2:
        "Cualquier persona puede buscar en el directorio de forma gratuita. Cualquier persona también puede enviar un recurso — incluyendo organizaciones que se registran directamente — y cada envío se revisa antes de publicarse, para mantener los listados precisos y evitar a quienes actúan de mala fe.",
      p3:
        "The Help Haven Network está hecho para, y por, personas que han necesitado recursos como estos y tuvieron dificultades para encontrarlos — y que cayeron duro por esa brecha. Existe para que la próxima persona que busque no tenga que buscar tan arduamente, ni caer tan lejos, para encontrar ayuda.",
      disclaimerStrong: "Este es solo un directorio informativo.",
      disclaimerRest:
        " No sustituye la atención médica, legal o de crisis profesional. Si tú o alguien más está en peligro inmediato, llama al 911. Las listas son aportadas por la comunidad y revisadas, pero el horario y los requisitos pueden cambiar — siempre confirma directamente con la organización antes de ir.",
    },
    privacy: {
      title: "Política de Privacidad",
      intro:
        "The Help Haven Network (operado por Nisus Concepts LLC, una sociedad de responsabilidad limitada de Texas — \"nosotros\") es un directorio, no una empresa de datos. Esta página explica, en términos sencillos, qué recopilamos realmente cuando usas este sitio, por qué, y quién más lo ve.",
      lastUpdated: "Última actualización: septiembre de 2026.",
      machineTranslatedNotice:
        "Esta traducción al español fue generada por traducción automática. La versión en inglés es el texto oficial; si algo aquí no es claro o parece contradecirla, consulta la página en inglés o contáctanos.",
      sections: [
        {
          key: "shortVersion",
          title: "La versión breve",
          body:
            "No necesitas una cuenta para buscar en este directorio. No publicamos anuncios, no vendemos datos, ni usamos rastreadores de análisis o publicidad de terceros. Las únicas cuentas en este sitio pertenecen al pequeño equipo que revisa los envíos. Lo que sigue es el detalle completo detrás de ese resumen.",
        },
        {
          key: "infoYouProvide",
          title: "Información que tú proporcionas",
          body:
            "Recopilamos información personal a través de cuatro formularios en este sitio. Los formularios de Sugerencias y de Voluntariado y Donaciones recopilan tu nombre, correo electrónico y (en el caso de Voluntariado y Donaciones) tu teléfono, además del mensaje que escribas. El widget de retroalimentación en cada recurso recopila una respuesta de sí/no sobre su exactitud y una nota opcional de texto libre. Si usas el formulario \"Agregar un recurso\", recopilamos lo que escribas en él: el nombre de una organización, categoría, descripción, número de teléfono, ciudad/región, dirección, horario, requisitos de elegibilidad, sitio web, y una nota opcional para quien lo revise, además de si estás enviándolo como individuo o en nombre de una organización. El formulario no pide tu propio nombre, correo electrónico ni teléfono — no sabemos quién envió algo a menos que tú decidas decirlo en el campo de notas. Todo lo que envíes se almacena en nuestra base de datos y es revisado por un administrador antes de publicarse; podemos editar un envío por claridad o precisión antes de publicarlo.",
        },
        {
          key: "autoCollected",
          title: "Información recopilada automáticamente",
          body:
            "Mantenemos un registro de visitas anónimo y mínimo — solo la ruta de la página y una marca de tiempo, nada que te identifique — reservado solo para administradores en el panel interno de revisión; no hay un contador público de visitas en el sitio. Un pequeño marcador en el almacenamiento de sesión de tu navegador (no es una cookie, y no se comparte entre sitios) evita que ese conteo se infle cada vez que cargas una nueva página durante la misma visita; desaparece cuando cierras la pestaña.\n\nPor separado, nuestros proveedores de hospedaje y base de datos (Vercel y Supabase, abajo) generan sus propios registros estándar de infraestructura — del tipo que cualquier proveedor de hospedaje mantiene por seguridad y confiabilidad — que pueden incluir direcciones IP. Nosotros no accedemos ni usamos esos registros directamente; existen a nivel de infraestructura, gobernados por las propias prácticas de privacidad de esos proveedores.",
        },
        {
          key: "mapAndSearch",
          title: "El mapa y la búsqueda",
          body:
            "El mapa en las páginas de búsqueda carga mosaicos directamente desde los servidores de OpenStreetMap, y un código postal con el que buscas se envía al servicio de geocodificación Nominatim de OpenStreetMap (a través de nuestro propio servidor, no directamente desde tu navegador) para convertirlo en una ubicación en el mapa. Ninguno de estos intercambios incluye tu nombre ni información de cuenta — no existe una — pero cargar cualquier mosaico de mapa o solicitud de geocodificación de terceros funciona como cargar cualquier otra imagen o recurso de internet: el propio servidor del proveedor ve la solicitud, incluyendo tu dirección IP, bajo sus propias políticas.",
        },
        {
          key: "fonts",
          title: "Fuentes tipográficas",
          body:
            "Las tipografías del sitio se cargan desde Google Fonts y jsDelivr, dos redes de distribución de contenido muy utilizadas. Como con cualquier fuente o script cargado desde un CDN, tu navegador hace una solicitud directa a sus servidores, sujeta a sus propias prácticas estándar de registro — no se involucra ningún inicio de sesión ni datos personales del sitio.",
        },
        {
          key: "adminAccounts",
          title: "Cuentas de administrador",
          body:
            "El equipo de revisión del sitio inicia sesión a través de Supabase Authentication (correo y contraseña). Ese sistema de inicio de sesión es de Supabase, no nuestro para inspeccionar — nunca vemos ni almacenamos una contraseña en texto plano. Esto aplica solo al pequeño equipo interno de revisión; el público nunca necesita una cuenta para usar este sitio.",
        },
        {
          key: "whoWeShare",
          title: "Con quién compartimos información",
          body:
            "No vendemos, alquilamos ni intercambiamos ninguna información recopilada a través de este sitio. Las únicas partes que la procesan son la infraestructura sobre la que operamos — Supabase (base de datos y autenticación), Vercel (hospedaje), OpenStreetMap (mosaicos de mapa y geocodificación), y Google Fonts / jsDelivr (entrega de fuentes) — cada una actuando como proveedor de servicios, no como usuario independiente de tus datos. Los listados de recursos publicados son, por diseño, públicos y visibles para cualquiera que visite el sitio; ese es precisamente el propósito de un directorio.",
        },
        {
          key: "childrens",
          title: "Privacidad de menores",
          body:
            "Este directorio incluye recursos relevantes para personas de cualquier edad, incluyendo menores que buscan ayuda (por ejemplo, apoyo LGBTQ+ o de violencia doméstica). Navegar y buscar en el directorio no requiere información personal de nadie. No recopilamos a sabiendas información personal de menores a través del formulario de envío, y pedimos a quienes envían información que no incluyan datos personales de un menor en una nota o descripción. Si crees que un envío contiene información personal de un menor, contáctanos abajo y la eliminaremos.",
        },
        {
          key: "yourChoices",
          title: "Tus opciones",
          body:
            "Como no recopilamos información de contacto de los usuarios públicos, no hay cuenta ni lista de marketing de la cual darse de baja. Si enviaste un recurso y quieres que se corrija, actualice o elimine — ya sea el listado de tu propia organización o uno que marcaste como inexacto — escríbenos a nisusconcepts@gmail.com y actuaremos al respecto.",
        },
        {
          key: "changes",
          title: "Cambios a esta política",
          body:
            "Si la forma en que manejamos los datos cambia de manera significativa, actualizaremos esta página y la fecha de \"última actualización\" en la parte superior. No enviamos avisos por aclaraciones de redacción de rutina.",
        },
        {
          key: "contact",
          title: "Contacto",
          body:
            "Preguntas sobre esta política, o sobre información vinculada a un envío específico, escríbenos a nisusconcepts@gmail.com.",
        },
      ],
    },
    terms: {
      title: "Términos de Servicio",
      intro:
        "Estos términos rigen tu uso de The Help Haven Network (operado por Nisus Concepts LLC, una sociedad de responsabilidad limitada de Texas — \"nosotros\"). Al navegar este sitio o enviar un recurso, aceptas estos términos.",
      lastUpdated: "Última actualización: septiembre de 2026.",
      machineTranslatedNotice:
        "Esta traducción al español fue generada por traducción automática. La versión en inglés es el texto oficial; si algo aquí no es claro o parece contradecirla, consulta la página en inglés o contáctanos.",
      sections: [
        {
          key: "whatThisIs",
          title: "Qué es este sitio",
          body:
            "The Help Haven Network es un directorio informativo de recursos de salud mental, recuperación, refugio y otros tipos de apoyo. No sustituye la atención médica, legal o de crisis profesional, y no es en sí mismo un servicio de crisis. Si tú o alguien más está en peligro inmediato, llama al 911. No estamos afiliados a, ni controlamos, ninguna organización listada en el directorio.",
        },
        {
          key: "noGuarantee",
          title: "Sin garantía de exactitud",
          body:
            "Los listados son aportados por la comunidad y revisados antes de publicarse, pero las organizaciones cambian su horario, requisitos, personal y servicios sin avisarnos. Una insignia de \"Verificado\" significa que un administrador o nuestra revisión automática encontró el teléfono o la dirección listados en el propio sitio web de la organización en algún momento — es una heurística, no una garantía, y la ausencia de la insignia no significa que un listado esté equivocado. Siempre confirma el horario, los requisitos y la disponibilidad directamente con la organización antes de confiar en un listado.",
        },
        {
          key: "submitting",
          title: "Enviar un recurso",
          body:
            "Cualquiera puede enviar un recurso, incluyendo una organización que envíe su propio listado. Al enviarlo, confirmas que la información es precisa según tu mejor conocimiento y que tienes el derecho de compartirla, y nos otorgas un derecho no exclusivo y libre de regalías para publicar, mostrar y editar dicha información (por claridad, formato o precisión) en este sitio. Revisamos cada envío antes de publicarlo y podemos rechazar, editar o eliminar posteriormente cualquier listado a nuestra discreción — incluyendo uno que sea inexacto, engañoso, spam, o de otra forma inapropiado para un directorio que sirve a personas en situaciones vulnerables. Enviar un recurso no garantiza que será publicado, ni crea ninguna relación comercial entre tú y nosotros.",
        },
        {
          key: "acceptableUse",
          title: "Uso aceptable",
          body:
            "No uses este sitio para enviar información falsa, fraudulenta o engañosa; para hacer spam, extraer datos a gran escala, o intentar evadir las protecciones anti-spam del formulario; para hacerte pasar por una organización que no estás autorizado a representar; o para enviar cualquier cosa ilegal, abusiva, o que pudiera poner en riesgo a una persona vulnerable. Podemos bloquear el acceso o eliminar contenido de cualquiera que viole esto.",
        },
        {
          key: "thirdParty",
          title: "Organizaciones de terceros y enlaces",
          body:
            "Los listados enlazan o describen servicios operados por terceros independientes. Usar los servicios de cualquier organización listada es un asunto entre tú y esa organización, regido por sus propias políticas, no las nuestras. No somos responsables de la conducta, el contenido o los servicios de ninguna organización listada aquí, y listar una organización no es una aprobación de la misma más allá de lo que confirma nuestro proceso de revisión (la exactitud de la información de contacto, no la calidad de la atención).",
        },
        {
          key: "ip",
          title: "Propiedad intelectual",
          body:
            "El diseño, el código y el contenido escrito original del sitio pertenecen a Nisus Concepts LLC. El contenido de los listados enviados sigue siendo del remitente (o de la organización), compartido con nosotros bajo la licencia anterior. Puedes compartir enlaces a este sitio o citar un listado para referencia personal y no comercial; no puedes extraer ni republicar el directorio como propio sin nuestro permiso.",
        },
        {
          key: "noWarranty",
          title: "Sin garantía",
          body:
            "Este sitio se proporciona \"tal cual\", sin garantías de ningún tipo, expresas o implícitas, incluyendo exactitud, disponibilidad o idoneidad para un propósito particular. Hacemos nuestro mejor esfuerzo para mantener los listados actualizados y el sitio en funcionamiento, pero no garantizamos ninguno de los dos.",
        },
        {
          key: "liability",
          title: "Limitación de responsabilidad",
          body:
            "En la máxima medida permitida por la ley, Nisus Concepts LLC y The Help Haven Network no son responsables de ningún daño derivado de tu uso de este sitio o de tu confianza en cualquier información listada — incluyendo daños causados por un listado inexacto, la propia conducta de una organización, o una interrupción del servicio. Nada aquí limita la responsabilidad donde la ley no permite que se limite.",
        },
        {
          key: "changes",
          title: "Cambios",
          body:
            "Podemos actualizar estos términos a medida que el sitio cambie. Los cambios importantes actualizarán la fecha de \"última actualización\" arriba; continuar usando el sitio después de un cambio significa que aceptas los términos actualizados.",
        },
        {
          key: "governingLaw",
          title: "Ley aplicable",
          body:
            "Estos términos se rigen por las leyes del Estado de Texas, sin considerar los principios de conflicto de leyes.",
        },
        {
          key: "contact",
          title: "Contacto",
          body:
            "Preguntas sobre estos términos, o sobre un listado que creas que los infringe, escríbenos a nisusconcepts@gmail.com.",
        },
      ],
    },
    categoryRail: {
      detoxToggle: "Mostrar solo lugares que ofrecen desintoxicación",
    },
    browse: {
      subtitle: "Busca por nombre o necesidad abajo, o filtra por código postal — el mapa está más abajo, debajo de los listados.",
      searchPlaceholder: "Busca por nombre, servicio o necesidad…",
      zipPlaceholder: "Código postal",
      findNearby: "Buscar cerca",
      update: "Actualizar",
      clearZip: "Borrar código postal",
      locating: "Ubicando {{zip}}…",
      showingNear: "Mostrando recursos dentro de {{radius}} millas de {{zip}}, además de líneas telefónicas/de texto y servicios estatales que no están ligados a una sola dirección.",
      showingIn: "Mostrando recursos ubicados en {{zip}}, además de líneas telefónicas/de texto y servicios estatales que no están ligados a una sola dirección.",
      loadError: "No se pudo cargar el directorio: {{error}}. Verifica las variables de entorno de Supabase en .env.local.",
      resourcesMatch: "{{count}} recurso{{plural}} coinciden",
      printList: "🖨 Imprimir esta lista",
      emptyDetox: "Ningún listado que ofrezca desintoxicación coincide todavía con tus otros filtros. Intenta quitar el código postal o el filtro de categoría.",
      emptyZip: "Todavía no se encontraron recursos en {{zip}}. Intenta un código postal cercano, o usa \"Agregar un recurso\" para agregar uno.",
      emptyDefault: "Todavía no hay recursos que coincidan. Intenta una búsqueda diferente, o usa \"Agregar un recurso\" para agregar uno.",
      prevPage: "← Anterior",
      nextPage: "Siguiente →",
      pageStatus: "Página {{page}} de {{total}}",
      printTitle: "The Help Haven Network",
      printedOn: "impreso el {{date}}",
      printNear: "cerca de {{zip}}",
      printEmpty: "Ningún recurso coincide con esta búsqueda.",
      printFree: "(Gratis)",
      print247: "(24/7)",
      mapView: "Vista de mapa",
      loadingMap: "Cargando mapa…",
    },
    suggestions: {
      title: "Sugerencias",
      subtitle:
        "Este sitio solo mejora con la opinión de las personas que realmente lo usan. ¿Falta un recurso, encontraste algo confuso, o tienes una idea que facilitaría el uso de este sitio? Cuéntanos abajo — la información de contacto es opcional, pero si dejas un correo electrónico podríamos dar seguimiento.",
      messageLabel: "Tu sugerencia",
      messagePlaceholder: "¿Qué haría este sitio más útil?",
      nameLabel: "Nombre (opcional)",
      emailLabel: "Correo electrónico (opcional)",
      emailPlaceholder: "Solo si deseas una respuesta",
      submit: "Enviar sugerencia",
      submitting: "Enviando…",
      errPrefix: "Algo salió mal ({{error}}). Por favor, intenta de nuevo.",
      ok: "Gracias — leemos cada sugerencia, y realmente da forma a lo que construimos después.",
    },
    add: {
      title: "Agregar un recurso",
      subtitle:
        "¿Conoces un servicio que debería estar listado — o tú mismo diriges uno? Las organizaciones pueden agregar su propio listado directamente. Cada envío se revisa antes de publicarse, lo que mantiene el directorio preciso y seguro.",
      whoLabel: "¿Quién está enviando esto?",
      whoIndividual: "Encontré este recurso",
      whoOrg: "Represento a esta organización",
      orgContactHint: "Como estás enviando esto en nombre de esta organización, incluye un número de teléfono o sitio web abajo para que podamos verificar el listado.",
      orgContactRequired: "Por favor incluye un número de teléfono o sitio web para que podamos verificar el listado de esta organización.",
      nameLabel: "Nombre de la organización",
      categoryLabel: "Categoría",
      descLabel: "¿Con qué ayudan?",
      descPlaceholder: "Breve descripción de los servicios ofrecidos",
      phoneLabel: "Teléfono",
      phonePlaceholder: "(xxx) xxx-xxxx",
      areaLabel: "Ciudad / región",
      areaPlaceholder: "p. ej. Fort Worth, TX",
      addressLabel: "Dirección",
      addressPlaceholder: "Calle, ciudad, código postal",
      hoursLabel: "Horario / días abiertos",
      hoursPlaceholder: "p. ej. lun-vie 9am-3pm, cerrado dom",
      requirementsLabel: "Requisitos para recibir servicios (opcional)",
      requirementsPlaceholder: "p. ej. identificación con foto, comprobante de domicilio, se necesita cita, límites de ingresos",
      websiteLabel: "Sitio web (opcional)",
      noteLabel: "¿Algo más que el revisor deba saber? (opcional)",
      submit: "Enviar para revisión",
      submitting: "Enviando…",
      errPrefix: "Algo salió mal ({{error}}). Por favor, intenta de nuevo.",
      ok: "Gracias — esto será revisado antes de aparecer en el directorio.",
    },
    volunteer: {
      heroTitle: "Voluntariado y Donaciones",
      heroSubtitle:
        "The Help Haven Network funciona con tiempo voluntario y apoyo comunitario. Si tienes una hora o una habilidad que ofrecer, o quieres apoyar directamente este trabajo, aquí te decimos cómo.",
      sectionTitle: "Sé voluntario con nosotros",
      sectionBody:
        "Somos una operación nueva y pequeña, así que la ayuda voluntaria rinde mucho — verificando listados, investigando nuevos recursos, difundiendo la información, o simplemente diciéndonos qué falta. Cuéntanos un poco sobre ti y te contactaremos.",
      nameLabel: "Nombre",
      emailLabel: "Correo electrónico",
      phoneLabel: "Teléfono (opcional)",
      messageLabel: "¿Cómo te gustaría ayudar? (opcional)",
      messagePlaceholder: "Habilidades, disponibilidad, lo que te interesa...",
      submit: "Registrarme como voluntario",
      submitting: "Enviando…",
      errPrefix: "Algo salió mal ({{error}}). Por favor, intenta de nuevo.",
      ok: "Gracias — te contactaremos sobre formas de ayudar.",
      donateTitle: "Donar",
      donateBody:
        "Estamos preparando una forma de aceptar donaciones directamente — vuelve a revisar pronto. Mientras tanto, si deseas apoyar al directorio económicamente, {{link}} y daremos seguimiento.",
      donateLink: "contáctanos por correo electrónico",
    },
    resourceFeedback: {
      question: "¿Sigue siendo exacto?",
      yes: "Sí",
      no: "No",
      notePrompt: "¿Qué cambió? (opcional)",
      notePlaceholder: "p. ej. número desconectado, cambió de ubicación...",
      submit: "Enviar",
      submitting: "Enviando…",
      thanks: "Gracias por avisarnos — esto ayuda a mantener el directorio preciso.",
    },
    shareButton: {
      share: "Compartir este recurso",
      copied: "¡Enlace copiado!",
    },
  },
};
