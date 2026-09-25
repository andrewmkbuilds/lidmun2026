// Single source of truth for LIDMUN committee content.
// Mirrors the original LIDMUN site structure. The Committee entity in the DB
// is only used to overlay admin-managed fields (e.g. guide_url).

const IMG = "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb";

export const COMMITTEES = [
  {
    slug: "formula-one",
    number: 1,
    name: "Formula One",
    category: "CRISIS",
    is_flagship: false,
    logo_url: `${IMG}/b1ec62fe9_f1.png`,
    description: "High-octane crisis simulation in the fast-paced world of Formula One racing. Navigate team dynamics, technical regulations, and real-time race strategy decisions.",
    intro: "Enter the high-speed world of Formula One racing where split-second decisions determine championships. Navigate team dynamics, technical regulations, strategic pit stops, and real-time crisis scenarios in the most technologically advanced motorsport on the planet.",
    heads: "Rizwan Ahmed",
    coheads: "Diya Amit, Abdur Rahman Khan",
    committeeType: "Crisis Committee",
    difficulty: "High-Intensity / Fast-Paced",
    agendaTitle: "⚠ CRISIS COMMITTEE - AGENDA CLASSIFIED ⚠",
    agendaBody: "The exact nature of this crisis committee remains classified until the conference begins. Delegates should prepare for high-stakes negotiations involving team management, race strategy, technical regulations, safety protocols, and the intersection of sport and geopolitics. Expect unexpected developments, real-time crisis scenarios, and the need for rapid diplomatic and strategic decision-making under pressure.",
    overview: [
      "Formula One represents a high-stakes arena where split-second decisions determine championships. This crisis committee immerses delegates in the fast-paced world of international motorsport, requiring rapid negotiation, strategic alliances, and the ability to adapt to crisis scenarios unfolding in real-time.",
      "Delegates will assume roles as team principals, race directors, FIA officials, and stakeholders managing unprecedented crises—technical regulation disputes, driver safety emergencies, sponsor conflicts, and geopolitical decisions affecting race calendars. Navigate team dynamics where every decision carries competitive and financial consequences.",
      "Expect dynamic crisis mechanics with real-time developments, technical challenges, and strategic negotiations where alliances shift rapidly. Delegates must balance sporting competition with commercial interests, manage safety concerns, and respond to evolving threats that could reshape the Formula One landscape.",
    ],
  },
  {
    slug: "gicc",
    number: 2,
    name: "GICC",
    category: "CRISIS",
    is_flagship: true,
    logo_url: `${IMG}/1ad215b35_gicc.png`,
    logoInvert: true,
    description: "Global Intelligence and Crisis Command — our premier flagship committee where intelligence agencies from around the world come together to address real-world problems. This committee features the highest stakes, fastest pace, and the most complex international crisis management.",
    intro: "Welcome to the Global Intelligence and Crisis Command - LIDMUN's most prestigious and challenging committee. Navigate classified operations, strategic intelligence analysis, and unprecedented international crises that will test the limits of your diplomatic, strategic, and analytical capabilities.",
    heads: "Yara",
    coheads: "Jia Vaswani, Ali Raza",
    committeeType: "Crisis Committee - Flagship",
    difficulty: "Maximum Complexity / Elite",
    clearance: "TOP SECRET",
    agendaTitle: "★ TOP SECRET - FLAGSHIP CRISIS COMMITTEE ★",
    agendaWarning: "CLEARANCE REQUIRED - AGENDA CLASSIFIED",
    agendaBody: "The GICC operates at the highest levels of international intelligence and crisis management. The exact nature of operations, scenarios, and objectives remain classified until delegates receive their security briefings. Expect multi-layered crises, intelligence operations, covert diplomacy, and scenarios that blur the lines between traditional state actors and emerging global threats. This committee demands absolute excellence in strategic thinking, improvisation, and crisis response.",
    overview: [
      "The Global Intelligence and Crisis Command represents the pinnacle of LIDMUN's committee offerings. As our flagship crisis committee, GICC operates at the highest echelons of international intelligence and crisis management, where classified operations, strategic intelligence analysis, and unprecedented global crises test delegates' diplomatic and analytical capabilities.",
      "Delegates will assume roles within shadowy networks of intelligence agencies, special operations units, and diplomatic corps. Navigate classified operations with incomplete intelligence, make time-sensitive decisions with global consequences, and manage multi-layered crises where information is power and alliances shift rapidly.",
      "GICC features advanced crisis mechanics including real-time intelligence briefings, backroom negotiations, covert operations, and evolving threat scenarios. Delegates must demonstrate exceptional analytical skills, strategic foresight, and the ability to operate under extreme pressure in an environment where traditional diplomatic rules are suspended.",
    ],
    overviewNote: "★ This committee is recommended for experienced MUNers with prior crisis committee participation. The exact nature of operations and scenarios remain classified until security briefings.",
    flagshipFeatures: [
      { title: "Advanced Crisis Mechanics", desc: "Multi-layered scenarios with unprecedented complexity and realism" },
      { title: "Intelligence Operations", desc: "Real-time intelligence gathering, analysis, and covert action capabilities" },
      { title: "Elite Chairing Team", desc: "Experienced chairs specializing in high-level crisis simulation" },
      { title: "Exclusive Resources", desc: "Classified briefings, specialized background guides, and strategic toolkits" },
      { title: "Elevated Recognition", desc: "Outstanding delegates may receive special commendations and awards" },
    ],
  },
  {
    slug: "fifa",
    number: 3,
    name: "FIFA",
    category: "BEGINNER",
    is_flagship: false,
    logo_url: `${IMG}/3241baf1b_fifa.png`,
    description: "Addressing systemic corruption and match-fixing vulnerabilities among refereeing panels in FIFA World Cup tournaments.",
    intro: "The Fédération Internationale de Football Association governs the world's most popular sport. This committee explores how sports governance, transparency, and ethical accountability can protect the integrity of international football competitions.",
    heads: "Pranav",
    coheads: "Mahika Khandelwal",
    committeeType: "Beginner",
    difficulty: "Accessible / Educational",
    agendaTitle: "Addressing systemic corruption and match-fixing vulnerabilities among refereeing panels in FIFA World Cup tournaments.",
    agendaBody: "Delegates will discuss governance reforms, integrity mechanisms, and international accountability to protect the credibility of elite football competitions.",
    overview: [
      "As a beginner committee, FIFA provides an excellent introduction to international sports governance and diplomatic negotiation centered on integrity, transparency, and accountability.",
      "Delegates will represent football stakeholders in debates over corruption prevention, officiating standards, and the safeguards needed to protect tournaments from match-fixing and institutional abuse.",
      "Our experienced chairing team will guide delegates through discussions on governance reforms, ethical leadership, and the role of international institutions in preserving the credibility of football.",
    ],
  },
  {
    slug: "unhrc",
    number: 4,
    name: "UNHRC",
    category: "BEGINNER",
    is_flagship: false,
    logo_url: null,
    description: "Protecting the basic human rights and safety of refugees who are forced to flee their homes due to war, violence, or severe climate disasters.",
    intro: "The United Nations Human Rights Council addresses the protection of human dignity, civil liberties, and international accountability in response to displacement, violence, and humanitarian crisis.",
    heads: "Manasavi",
    coheads: "Ayaan, Joanna",
    committeeType: "Beginner",
    difficulty: "Accessible / Educational",
    agendaTitle: "Protecting the basic human rights and safety of refugees who are forced to flee their homes due to war, violence, or severe climate disasters.",
    agendaBody: "Delegates will debate how the international community can strengthen protection, humanitarian access, and durable solutions for displaced populations facing escalating global crises.",
    overview: [
      "As a beginner committee, UNHRC will introduce delegates to the practical challenges of protecting refugees and displaced persons in a rapidly changing global landscape.",
      "Delegates will represent UN member states in debates over humanitarian access, asylum protections, climate-induced displacement, and the responsibilities of the international community during conflict and disaster.",
      "Our experienced chairing team will guide delegates through discussions of human rights obligations, durable solutions, and the balance between state sovereignty and international protection.",
    ],
  },
  {
    slug: "ga1",
    number: 5,
    name: "GA1 - (DISEC)",
    category: "BEGINNER",
    is_flagship: false,
    logo_url: `${IMG}/c065e8d70_ga1.png`,
    description: "Controlling the illegal sale of street weapons and reducing the danger of a full-scale war breaking out on the India-Pakistan border.",
    intro: "The First Committee of the General Assembly addresses disarmament and international security matters. This beginner committee examines the risks of small arms proliferation, regional escalation, and the need for coordinated diplomatic responses to prevent wider conflict.",
    heads: "Christopher",
    coheads: "Kumail Ali Palana, Spriha Gupta",
    committeeType: "Beginner",
    difficulty: "Accessible / Educational",
    agendaTitle: "Controlling the illegal sale of street weapons and reducing the danger of a full-scale war breaking out on the India-Pakistan border.",
    agendaBody: "Delegates will address the risks of proliferation, cross-border escalation, and the need for coordinated diplomatic and security measures in a highly volatile region.",
    overview: [
      "As a beginner committee, GA1 (DISEC) provides an excellent introduction to disarmament and security discussions focused on the growing danger of illicit weapons flows and cross-border instability.",
      "Delegates will represent UN member states in discussions on arms trafficking, regional security, and the political and humanitarian consequences of escalating tensions along the India-Pakistan border.",
      "Our experienced chairing team will guide delegates through debates on diplomacy, confidence-building measures, and practical steps to reduce the risk of a full-scale war.",
    ],
  },
  {
    slug: "ga2",
    number: 6,
    name: "GA2 - (ECOFIN)",
    category: "ADVANCED",
    is_flagship: false,
    logo_url: `${IMG}/fdaf87c29_ga2.png`,
    description: "Protecting the global trading system by standing up against universal import tariffs and unilateral trade barriers that threaten international economic stability.",
    intro: "The Second Committee of the General Assembly focuses on economic and financial matters affecting international development. This advanced committee examines how protectionist policies, tariff disputes, and trade barriers threaten global economic stability.",
    heads: "Vidya Prashant",
    coheads: "Aaradhya, Inaya Afzal",
    committeeType: "Advanced",
    difficulty: "Advanced / Complex",
    agendaTitle: "Protecting the global trading system by standing up against universal import tariffs and unilateral trade barriers that threaten international economic stability.",
    agendaBody: "Delegates will explore how governments can preserve open trade, manage economic tensions, and defend the stability of the international trading system.",
    overview: [
      "As an advanced committee, GA2 will tackle the complex challenge of preserving a stable global trading system in the face of rising tariffs and unilateral trade barriers.",
      "Delegates will represent UN member states navigating questions of economic sovereignty, supply chain resilience, and the consequences of protectionist policies for developing and developed economies alike.",
      "Through formal caucuses and negotiations, delegates will draft resolutions on trade cooperation, fair market access, and mechanisms to defend international economic stability.",
    ],
  },
  {
    slug: "unsc",
    number: 7,
    name: "UNSC",
    category: "ADVANCED",
    is_flagship: false,
    logo_url: null,
    description: "Preventing military conflict and protecting the free movement of international cargo ships in the disputed waters of the South China Sea.",
    intro: "The United Nations Security Council addresses matters of international peace and security, with a focus on crisis prevention, maritime stability, and the protection of vital trade routes in contested waters.",
    heads: "Zarah Menezes",
    coheads: "Anvi, Nashmia",
    committeeType: "Advanced",
    difficulty: "Advanced / Complex",
    agendaTitle: "Preventing military conflict and protecting the free movement of international cargo ships in the disputed waters of the South China Sea.",
    agendaBody: "Delegates will examine the security implications of contested maritime claims, the role of major powers, and the need for lawful, stable navigation in one of the world's most strategically important regions.",
    overview: [
      "As an advanced committee, UNSC will focus on the strategic and legal risks surrounding military escalation in the South China Sea. Delegates will grapple with questions of sovereignty, deterrence, freedom of navigation, and the role of regional and global powers.",
      "Delegates will represent UN member states navigating the delicate balance between national security interests and international stability, analyzing how naval incidents, alliance commitments, and maritime law shape conflict dynamics.",
      "Through formal caucuses, diplomacy, and resolution drafting, delegates will develop strategies to prevent direct confrontation while protecting the free movement of international cargo ships and preserving regional stability.",
    ],
  },
  {
    slug: "ipmc",
    number: 8,
    name: "IPMC",
    category: "CRISIS",
    is_flagship: false,
    logo_url: `${IMG}/cf3f8a2ce_ipmc.svg`,
    description: "High-stakes crisis journalism and information operations. Expose leaks, conduct real-time press scrums, and shape international narratives during breaking emergencies.",
    intro: "Step behind the lines of conventional diplomacy into the high-stakes arena of crisis journalism and strategic communications. In IPMC, the pen is not just mightier than the sword—it is a weapon of geopolitical influence, uncovering clandestine actions, exposing disinformation, and shaping summit outcomes in real-time.",
    heads: "Zaid Khan, Muhammed Aleemuddin",
    coheads: "Maahthith",
    committeeType: "Crisis Press Committee",
    difficulty: "High-Intensity / Fast-Paced",
    agendaTitle: "⚠ CRISIS SIMULATION - LIVE INTELLIGENCE FEED ⚠",
    agendaWarning: "Crisis Media Operations, Information Warfare, and Real-Time Accountability.",
    agendaBody: "The committee's unfolding scenarios remain highly confidential. Delegates will navigate unexpected crisis breaks, leaked state secrets, adversarial press interrogations, and live investigative field operations that hold every committee and world leader accountable before the international public.",
    overview: [
      "The International Press & Media Corps operates as an active participant in the LIDMUN summit ecosystem. Rather than passively reporting past events, delegates in IPMC drive breaking narratives, conduct high-pressure press conferences, investigate backroom deals, and publish explosive crisis dispatches that directly influence committee agendas across the summit.",
      "Delegates will represent distinct media conglomerates, independent investigative journalists, intelligence whistleblowers, and news agencies spanning different ideological and geopolitical spectrums. Whether exposing secret pacts or managing media blackouts, every article and press question carries real consequences.",
      "Expect rapid crisis updates, press scrums, live broadcast simulations, and the fast-paced thrill of breaking exclusive stories while maintaining journalistic ethics under extraordinary geopolitical pressure.",
    ],
  },
  {
    slug: "uncsw",
    number: 9,
    name: "UNCSW",
    category: "ADVANCED",
    is_flagship: false,
    logo_url: `${IMG}/9db5c375f_uncsw.svg`,
    description: "Eliminating Structural Barriers and Algorithmic Bias to Ensure Equal Access to Digital and Legal Systems for Women and Girls.",
    intro: "The United Nations Commission on the Status of Women is the paramount global intergovernmental forum championing gender parity and human rights. In an era accelerated by technological revolution, UNCSW convenes to dismantle systemic digital barriers and establish legally binding protections for women and girls.",
    heads: "Shipra Sharma, Lily",
    coheads: "Nada",
    committeeType: "Advanced / Functional Commission",
    difficulty: "Advanced / Policy & Legal Systems",
    agendaTitle: "Eliminating Structural Barriers and Algorithmic Bias to Ensure Equal Access to Digital and Legal Systems for Women and Girls.",
    agendaBody: "Delegates will analyze the deep systemic mechanisms through which automated systems, machine learning datasets, and inequitable judicial structures perpetuate exclusion. The committee will formulate comprehensive international policy recommendations, algorithmic transparency standards, and digital access guarantees.",
    overview: [
      "As automated decision-making and artificial intelligence increasingly govern criminal justice, credit access, public benefits, and education, algorithmic prejudice poses a direct threat to civil liberties. In UNCSW, delegates will confront the digital divide that disenfranchises millions of women and girls worldwide.",
      "Delegates will represent sovereign member states, grappling with disparate legal traditions, regulatory architectures, and data sovereignty policies. Debates will demand technical acumen alongside diplomatic finesse to establish auditing protocols and cross-border standards for ethical technology.",
      "Through rigorous substantive caucus debate, comprehensive working paper formation, and resolution drafting, delegates will work to ensure that digital and legal systems are engines of justice, empowerment, and equality for all women and girls.",
    ],
  },
  {
    slug: "icao",
    number: 10,
    name: "ICAO",
    category: "CRISIS",
    is_flagship: false,
    logo_url: `${IMG}/0117665c1_icao.svg`,
    description: "Urgent aviation crisis simulation confronting contested airspace, radar breaches, drone and missile disruptions, and emergency international flight safety protocols.",
    intro: "The International Civil Aviation Organization governs global skies, coordinating navigation, air safety, and sovereign airspace jurisdiction. When aerial territorial incursions, commercial airliner emergencies, and electronic warfare collide, ICAO becomes the frontline of real-time crisis containment.",
    heads: "Nishka, Naitik",
    coheads: "Gagan Remesh",
    committeeType: "Crisis Committee",
    difficulty: "High-Intensity / Real-Time Operations",
    agendaTitle: "⚠ CRISIS SIMULATION - IMMEDIATE FLIGHT NOTAM ⚠",
    agendaWarning: "Sovereign Airspace Violations, Critical Aviation Security, and Emergency Flight Corridors.",
    agendaBody: "The emergency crisis scenario is classified until the opening gavel. Delegates must prepare for real-time aerial alerts, sudden no-fly zone declarations, GNSS spoofing attacks, hijacked civilian transponders, and escalating military intercept incidents threatening global civil aviation.",
    overview: [
      "In this dynamic crisis committee, delegates represent national aviation authorities, defense liaisons, international airline conglomerates, and air traffic control commands. As critical events break across radar feeds, delegates must react immediately using binding council directives, emergency airspace closures, and diplomatic backroom maneuvers.",
      "The tension between national sovereignty and international flight freedom takes center stage. Balancing the commercial vitality of global aviation corridors with urgent military and national security imperatives will test delegates' crisis-management instincts and rapid multilateral problem-solving.",
      "Expect rapid crisis updates from the backroom, timed directive drafts, emergency press releases, and high-pressure negotiations to de-escalate mid-air flashpoints before they spiral into full-scale international conflicts.",
    ],
  },
];

export const COMMITTEE_MAP = COMMITTEES.reduce((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});

export const categoryLabel = (cat) =>
  cat === "CRISIS" ? "CRISIS COMMITTEE" : cat === "BEGINNER" ? "BEGINNER COMMITTEE" : "ADVANCED COMMITTEE";

export const isCrisis = (cat) => cat === "CRISIS";

export const headChairLabel = (heads = "") => (heads.includes(",") ? "HEAD CHAIRS" : "HEAD CHAIR");
export const coChairLabel = (coheads = "") => (coheads && coheads.includes(",") ? "CO-CHAIRS" : "CO-CHAIR");

export const dirHeadLabel = (heads = "") => (heads.includes(",") ? "HEADS" : "HEAD");
export const dirCoLabel = (coheads = "") => (coheads && coheads.includes(",") ? "CO-HEADS" : "CO-HEAD");

// Official LIDMUN palette is strictly black / white / grayscale.
// Category accents use brightness levels to preserve hierarchy without color.
export const ACCENTS = {
  flagship: "#ffffff",
  crisis: "#e5e7eb",
  beginner: "#9ca3af",
  advanced: "#6b7280",
};

export const accentFor = (category, is_flagship) => {
  if (is_flagship) return ACCENTS.flagship;
  if (category === "CRISIS") return ACCENTS.crisis;
  if (category === "BEGINNER") return ACCENTS.beginner;
  return ACCENTS.advanced;
};