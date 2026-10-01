const navigation = [
  { name: "Dashboard", icon: "grid" },
  { name: "Compliance Radar", icon: "radar" },
  { name: "Investigation", icon: "search" },
  { name: "Action Plan", icon: "list" },
  { name: "Impact View", icon: "chart" },
  { name: "Microsoft Architecture", icon: "cloud" },
  { name: "Command Console", icon: "terminal" },
  { name: "Executive Walkthrough", icon: "play" },
];

const risks = [
  {
    title: "Mobile pricing disclosure missing",
    category: "Disclosure",
    severity: "Critical",
    exposure: "$12M",
    confidence: "95%",
    owner: "Consumer Legal",
    due: "Today",
    action: "Update customer-facing language",
    product: "Unlimited Plus Mobile",
    detail:
      "The new unlimited-plan offer is missing clear price and promotional-term disclosures in customer-care scripts. Current language does not consistently explain the post-promotion price.",
  },
  {
    title: "AI customer service privacy review gap",
    category: "Privacy",
    severity: "High",
    exposure: "$8.7M",
    confidence: "91%",
    owner: "Privacy Office",
    due: "Oct 02",
    action: "Route to privacy assessment",
    product: "AI Customer Service Workflow",
    detail:
      "The AI-assisted support workflow may process account and conversation data before the required privacy assessment and retention review are complete.",
  },
  {
    title: "Accessibility notice not published",
    category: "Accessibility",
    severity: "High",
    exposure: "$5.2M",
    confidence: "86%",
    owner: "Digital Experience",
    due: "Oct 04",
    action: "Publish required notice",
    product: "Customer support portal",
    detail:
      "The latest support portal release does not include the required accessibility notice or an accessible path to request assistance.",
  },
  {
    title: "Spectrum reporting deadline approaching",
    category: "Network",
    severity: "Medium",
    exposure: "$3.8M",
    confidence: "89%",
    owner: "Spectrum Operations",
    due: "Oct 08",
    action: "Prepare filing package",
    product: "Spectrum reporting",
    detail:
      "The quarterly spectrum utilization report is due soon. Network measurements need to be reconciled with the filing package before submission.",
  },
  {
    title: "Wholesale access commitment drift",
    category: "Wholesale",
    severity: "Medium",
    exposure: "$2.6M",
    confidence: "84%",
    owner: "Wholesale Legal",
    due: "Oct 11",
    action: "Validate operational compliance",
    product: "Wholesale access",
    detail:
      "Recent fulfillment data suggests response times may be outside the agreed wholesale access commitments in two service regions.",
  },
];

const recommendations = [
  "Update mobile pricing disclosure language",
  "Route AI workflow to privacy assessment",
  "Publish accessibility notice",
  "Prepare spectrum filing package",
  "Create launch readiness compliance checklist",
];

const pageDescriptions = {
  Dashboard:
    "AI monitors product launches, privacy, accessibility, disclosure, spectrum, wholesale, and consumer obligations before compliance exposure emerges.",
  "Compliance Radar":
    "A prioritized view of regulatory exposure across launches, customer journeys, and operational controls.",
  Investigation:
    "Trace a detected risk to its supporting evidence, affected product, and recommended legal review.",
  "Action Plan":
    "Coordinate owners, due dates, and remediation steps while keeping human legal review in the loop.",
  "Impact View":
    "Understand where potential exposure is concentrated and how early controls protect the business.",
  "Microsoft Architecture":
    "A governed Microsoft cloud pattern for ingesting regulatory signals and routing decisions to legal teams.",
  "Command Console":
    "Ask the compliance agent about monitored launches, obligations, and the issues that need attention.",
  "Executive Walkthrough":
    "A concise, guided overview of how the regulatory compliance agent detects, prioritizes, and routes risk.",
};

const state = {
  page: "Dashboard",
  riskIndex: 0,
  radarFilter: "All",
  search: "",
  completedActions: new Set(),
  consoleAnswer: "",
  consoleQuestion: "",
  walkthroughStep: 0,
};

const app = document.querySelector("#app");

function icon(name, size = 20) {
  const paths = {
    scale:
      '<path d="M12 3v18"/><path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/><path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M7 21h10"/>',
    shield:
      '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    grid:
      '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    radar:
      '<circle cx="12" cy="12" r="9"/><path d="M12 3v9l6.4 6.4"/><path d="M7.5 7.5a6.4 6.4 0 0 0 0 9"/>',
    search:
      '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    list:
      '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    chart:
      '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
    cloud:
      '<path d="M20 16.2A4.5 4.5 0 0 0 18 7.5h-1.2A7 7 0 1 0 4 15.8"/>',
    database:
      '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    workflow:
      '<rect x="3" y="3" width="7" height="7" rx="1.5"/><path d="M6.5 10v4a2 2 0 0 0 2 2h7"/><rect x="14" y="13" width="7" height="7" rx="1.5"/>',
    terminal:
      '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    play:
      '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
    check:
      '<path d="m5 12 4 4L19 6"/>',
    arrow:
      '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    sparkle:
      '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/>',
    clock:
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    menu:
      '<path d="M4 6h16M4 12h16M4 18h16"/>',
    send:
      '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function riskPill(severity) {
  return `<span class="severity severity-${severity.toLowerCase()}"><span class="severity-dot"></span>${severity}</span>`;
}

function card(content, className = "") {
  return `<section class="card ${className}">${content}</section>`;
}

function pageHeader(title = state.page) {
  return `
    <header class="page-header">
      <div class="header-badges">
        <span class="badge badge-green">${icon("scale", 14)} Regulatory Compliance Agent</span>
        <span class="badge badge-blue">${icon("shield", 14)} Human legal review</span>
      </div>
      <h1>${escapeHtml(title)}</h1>
      <p>${pageDescriptions[title]}</p>
    </header>`;
}

function riskCards() {
  return risks
    .slice(0, 3)
    .map(
      (risk) => `
        <button class="risk-card" data-risk="${risks.indexOf(risk)}">
          <div class="risk-top">${riskPill(risk.severity)}<span class="risk-confidence">${risk.confidence} confidence</span></div>
          <h3>${risk.title}</h3>
          <div class="risk-bottom"><span>${risk.category}</span><strong>${risk.exposure}</strong></div>
        </button>`,
    )
    .join("");
}

function recommendationsList() {
  return recommendations
    .map(
      (item) => `
        <div class="recommendation">
          <span class="recommendation-check">${icon("check", 14)}</span>
          <span>${item}</span>
        </div>`,
    )
    .join("");
}

function dashboard() {
  const metrics = [
    ["2,420", "Regulatory obligations monitored", "shield"],
    ["147", "Active compliance checks", "radar"],
    ["23", "High-priority regulatory risks", "chart"],
    ["$42M", "Potential exposure avoided", "scale"],
    ["96%", "Control coverage score", "check"],
    ["11", "Product launches under review", "grid"],
  ];
  return `
    <div class="metric-grid">
      ${metrics
        .map(
          ([value, label, symbol], index) => `
            <article class="metric-card">
              <div class="metric-icon metric-icon-${index}">${icon(symbol, 17)}</div>
              <div class="metric-value">${value}</div>
              <div class="metric-label">${label}</div>
              ${index === 4 ? '<div class="coverage-track"><span></span></div>' : ""}
            </article>`,
        )
        .join("")}
    </div>
    <div class="dashboard-grid">
      ${card(
        `<div class="section-heading"><div><span class="eyebrow">PRIORITY SIGNALS</span><h2>Agent Executive Summary</h2></div><span class="live-indicator">Updated just now</span></div>
        <p class="summary-copy">The agent detected compliance issues across mobile pricing, AI customer service, accessibility publication, spectrum reporting, and wholesale access commitments. It prioritizes legal review based on exposure, confidence, customer impact, and launch timing.</p>
        <div class="risk-cards">${riskCards()}</div>
        <button class="text-link" data-page="Compliance Radar">Review compliance radar ${icon("arrow", 16)}</button>`,
        "summary-panel",
      )}
      ${card(
        `<div class="section-heading"><div><span class="eyebrow">HUMAN-APPROVED NEXT STEPS</span><h2>Autonomous Recommendations</h2></div><span class="sparkle">${icon("sparkle", 19)}</span></div>
        <div class="recommendations">${recommendationsList()}</div>
        <button class="primary-button full-button" data-page="Action Plan">Open action plan ${icon("arrow", 16)}</button>`,
        "recommendations-panel",
      )}
    </div>
    <div class="footer-note">${icon("shield", 15)} Agent recommendations are advisory. Legal decisions remain with your team.</div>`;
}

function radar() {
  const categories = ["All", ...new Set(risks.map((risk) => risk.category))];
  const filtered = risks.filter((risk) => {
    const categoryMatches =
      state.radarFilter === "All" || risk.category === state.radarFilter;
    const searchMatches = `${risk.title} ${risk.category} ${risk.product} ${risk.owner}`
      .toLowerCase()
      .includes(state.search.toLowerCase());
    return categoryMatches && searchMatches;
  });
  return `
    <div class="radar-summary">
      ${card(`<span class="eyebrow">MONITORED OBLIGATIONS</span><strong>2,420</strong><span>Across 8 regulatory domains</span>`)}
      ${card(`<span class="eyebrow">OPEN SIGNALS</span><strong>23</strong><span>5 need immediate attention</span>`)}
      ${card(`<span class="eyebrow">COVERAGE</span><strong>96%</strong><span>147 active compliance checks</span>`)}
    </div>
    ${card(
      `<div class="table-heading"><div><span class="eyebrow">RISK REGISTER</span><h2>Priority compliance signals</h2></div><label class="search-field">${icon("search", 17)}<input id="risk-search" type="search" placeholder="Search risks, products, owners..." value="${escapeHtml(state.search)}" /></label></div>
      <div class="filter-row">${categories
        .map(
          (category) => `
            <button class="filter-chip ${state.radarFilter === category ? "selected" : ""}" data-filter="${category}">${category}</button>`,
        )
        .join("")}</div>
      <div class="table-scroll"><table><thead><tr><th>COMPLIANCE SIGNAL</th><th>DOMAIN</th><th>SEVERITY</th><th>EXPOSURE</th><th>CONFIDENCE</th><th>OWNER</th><th>DUE</th></tr></thead>
      <tbody>${filtered
        .map(
          (risk) => `
            <tr class="clickable-row" data-risk="${risks.indexOf(risk)}" tabindex="0" role="button" aria-label="Investigate ${risk.title}">
              <td><strong>${risk.title}</strong><span class="table-subtitle">${risk.product}</span></td>
              <td>${risk.category}</td><td>${riskPill(risk.severity)}</td><td class="exposure-cell">${risk.exposure}</td><td>${risk.confidence}</td><td>${risk.owner}</td><td>${risk.due}</td>
            </tr>`,
        )
        .join("")}</tbody></table></div>
      ${filtered.length === 0 ? '<div class="empty-state">No signals match this search. Try another term or domain.</div>' : ""}
      <div class="table-footnote">Showing ${filtered.length} priority signals <span>Last synchronized a few moments ago</span></div>`,
      "table-card",
    )}`;
}

function investigation() {
  const risk = risks[state.riskIndex];
  return `
    <div class="investigation-layout">
      <div class="investigation-main">
        ${card(
          `<div class="detail-kicker">${icon("radar", 16)} DETECTED COMPLIANCE SIGNAL ${riskPill(risk.severity)}</div>
          <h2 class="detail-title">${risk.title}</h2>
          <p class="detail-copy">${risk.detail}</p>
          <div class="detail-metrics"><div><span>Potential exposure</span><strong>${risk.exposure}</strong></div><div><span>Agent confidence</span><strong>${risk.confidence}</strong></div><div><span>Impacted product</span><strong>${risk.product}</strong></div></div>`,
          "detail-card",
        )}
        ${card(
          `<div class="section-heading"><div><span class="eyebrow">EVIDENCE TRAIL</span><h2>Why this was flagged</h2></div><span class="evidence-count">3 signals</span></div>
          <div class="evidence-list">
            <div class="evidence-item"><span class="evidence-marker"></span><div><strong>Launch brief updated</strong><p>Pricing language changed in the Unlimited Plus Mobile campaign.</p></div><time>2h ago</time></div>
            <div class="evidence-item"><span class="evidence-marker"></span><div><strong>Disclosure control not satisfied</strong><p>Approved post-promotion price language was not found in the call-center script.</p></div><time>2h ago</time></div>
            <div class="evidence-item"><span class="evidence-marker"></span><div><strong>Customer impact elevated</strong><p>Offer is scheduled for broad customer availability this week.</p></div><time>Today</time></div>
          </div>`,
          "evidence-card",
        )}
      </div>
      <div class="investigation-aside">
        ${card(
          `<span class="eyebrow">RECOMMENDED REMEDIATION</span><h2 class="aside-title">${risk.action}</h2><p class="muted-copy">Route the proposed change to the responsible legal owner before launch approval.</p>
          <div class="owner-row"><span class="avatar">${risk.owner.slice(0, 1)}</span><div><strong>${risk.owner}</strong><span>Review owner</span></div></div>
          <div class="aside-divider"></div><div class="aside-meta"><span>Recommended deadline</span><strong>${risk.due}</strong></div><button class="primary-button full-button" data-page="Action Plan">View action plan ${icon("arrow", 16)}</button>`,
          "aside-card",
        )}
        ${card(`<div class="human-review-heading">${icon("shield", 18)} Human legal review</div><p class="muted-copy">This finding is a decision-support signal, not legal advice. Confirm the applicable obligation and response with counsel.</p>`, "human-review-card")}
      </div>
    </div>
    <div class="risk-selector">${risks
      .map(
        (item, index) => `
          <button class="risk-select ${state.riskIndex === index ? "active" : ""}" data-risk="${index}"><span>${item.category}</span><strong>${item.title}</strong>${riskPill(item.severity)}</button>`,
      )
      .join("")}</div>`;
}

function actionPlan() {
  const actions = risks.map((risk) => ({
    title: risk.action,
    context: risk.title,
    owner: risk.owner,
    due: risk.due,
  }));
  actions.push({
    title: "Create launch readiness compliance checklist",
    context: "Cross-functional launch governance",
    owner: "Product Counsel",
    due: "Oct 14",
  });
  const doneCount = state.completedActions.size;
  return `
    ${card(
      `<div class="plan-overview"><div><span class="eyebrow">REMEDIATION TRACKER</span><h2>Launch readiness action plan</h2><p>5 recommended actions · ${doneCount} completed · Human review required</p></div><div class="plan-progress"><strong>${Math.round((doneCount / actions.length) * 100)}%</strong><span>COMPLETE</span></div></div><div class="progress-track"><span style="width:${(doneCount / actions.length) * 100}%"></span></div>
      <div class="task-list">${actions
        .map(
          (action, index) => `
            <div class="task-row ${state.completedActions.has(index) ? "task-complete" : ""}">
              <button class="task-check" data-complete="${index}" aria-label="${state.completedActions.has(index) ? "Mark incomplete" : "Mark complete"}">${state.completedActions.has(index) ? icon("check", 15) : ""}</button>
              <div class="task-main"><strong>${action.title}</strong><span>${action.context}</span></div>
              <div class="task-owner"><span>OWNER</span><strong>${action.owner}</strong></div>
              <div class="task-due"><span>DUE</span><strong>${icon("clock", 14)} ${action.due}</strong></div>
              <span class="task-status ${state.completedActions.has(index) ? "status-complete" : ""}">${state.completedActions.has(index) ? "Completed" : "In review"}</span>
            </div>`,
        )
        .join("")}</div>`,
      "action-plan-card",
    )}
    <div class="plan-bottom-grid">
      ${card(`<span class="eyebrow">REVIEW PRINCIPLE</span><h3>People stay accountable</h3><p>AI prepares evidence and suggested actions. Legal owners confirm applicability, approve language, and sign off before launch.</p>`, "principle-card")}
      ${card(`<span class="eyebrow">UP NEXT</span><h3>Launch readiness review</h3><p>Two product launches require legal review before customer availability.</p><button class="text-link" data-page="Investigation">Open highest-priority finding ${icon("arrow", 15)}</button>`, "principle-card")}
    </div>`;
}

function impactView() {
  const bars = [
    { name: "Pricing", amount: "$12.0M", height: 100, color: "emerald" },
    { name: "Privacy", amount: "$8.7M", height: 73, color: "blue" },
    { name: "Access", amount: "$5.2M", height: 44, color: "violet" },
    { name: "Spectrum", amount: "$3.8M", height: 32, color: "amber" },
    { name: "Wholesale", amount: "$2.6M", height: 22, color: "rose" },
  ];
  return `
    <div class="impact-metrics">
      ${card(`<span class="eyebrow">POTENTIAL EXPOSURE</span><strong class="impact-number">$32.3M</strong><span>Across the 5 highest-priority signals</span>`)}
      ${card(`<span class="eyebrow">EXPOSURE AVOIDED</span><strong class="impact-number green-text">$42M</strong><span>Early control intervention estimate</span>`)}
      ${card(`<span class="eyebrow">CONTROL COVERAGE</span><strong class="impact-number">96%</strong><span>147 active checks across product launches</span>`)}
    </div>
    <div class="impact-content">
      ${card(`<div class="section-heading"><div><span class="eyebrow">RISK CONCENTRATION</span><h2>Estimated exposure by domain</h2></div><span class="chart-legend"><i></i> Potential exposure</span></div>
        <div class="bar-chart">${bars
          .map(
            (bar) => `
              <div class="bar-column"><strong>${bar.amount}</strong><div class="bar-track"><span class="bar-fill bar-${bar.color}" style="height:${bar.height}%"></span></div><span>${bar.name}</span></div>`,
          )
          .join("")}</div>
        <div class="chart-axis"><span>$0</span><span>$5M</span><span>$10M</span><span>$15M</span></div>`, "chart-card")}
      ${card(`<span class="eyebrow">CONTROL MIX</span><h2>Monitored obligations</h2><div class="mix-list">
        <div><span class="mix-dot mix-green"></span><span>Disclosure</span><strong>31%</strong><div class="mix-track"><i style="width:31%"></i></div></div>
        <div><span class="mix-dot mix-blue"></span><span>Privacy</span><strong>26%</strong><div class="mix-track"><i style="width:26%"></i></div></div>
        <div><span class="mix-dot mix-violet"></span><span>Network</span><strong>18%</strong><div class="mix-track"><i style="width:18%"></i></div></div>
        <div><span class="mix-dot mix-amber"></span><span>Accessibility</span><strong>15%</strong><div class="mix-track"><i style="width:15%"></i></div></div>
        <div><span class="mix-dot mix-rose"></span><span>Other</span><strong>10%</strong><div class="mix-track"><i style="width:10%"></i></div></div></div>`, "mix-card")}
    </div>
    <div class="footer-note">${icon("shield", 15)} Exposure estimates are illustrative and should be validated with legal and finance teams.</div>`;
}

function architecture() {
  const services = [
    ["cloud", "Azure", "Secure identity & API access"],
    ["sparkle", "Azure OpenAI", "Explainable risk prioritization"],
    ["database", "Microsoft Fabric", "Unified obligation & evidence data"],
    ["workflow", "Power Automate", "Human approval & remediation routing"],
    ["list", "Microsoft Purview", "Classification, lineage & audit"],
  ];
  return `
    ${card(`<div class="section-heading"><div><span class="eyebrow">REFERENCE PATTERN</span><h2>Governed by design. Human-led by default.</h2></div><span class="architecture-badge">${icon("shield", 15)} Enterprise-ready</span></div>
      <p class="architecture-intro">A modular Microsoft cloud architecture connects trusted regulatory sources to existing legal and product workflows—with identity, audit, and approval controls at every step.</p>
      <div class="architecture-flow">
        <div class="flow-zone source-zone"><span class="flow-label">SIGNALS & SOURCES</span><div class="source-pills"><span>FCC & regulator updates</span><span>Product launch briefs</span><span>Internal policy library</span><span>Customer care workflows</span></div></div>
        <div class="flow-connector">${icon("arrow", 19)}<span>Ingest & normalize</span></div>
        <div class="cloud-boundary"><div class="boundary-title">MICROSOFT CLOUD <span>Governed environment</span></div><div class="architecture-services">${services
          .map(
            ([symbol, title, description]) => `
              <div class="architecture-service"><span class="service-icon">${icon(symbol, 19)}</span><div><strong>${title}</strong><span>${description}</span></div></div>`,
          )
          .join("")}</div></div>
        <div class="flow-connector">${icon("arrow", 19)}<span>Review & resolve</span></div>
        <div class="flow-zone outcome-zone"><span class="flow-label">PEOPLE & ACTIONS</span><div class="source-pills"><span>Legal review queue</span><span>Product owners</span><span>Auditable remediation</span></div></div>
      </div>
      <div class="architecture-controls"><div><span class="control-shield">${icon("shield", 17)}</span><span><strong>Entra ID</strong> role-based access</span></div><div><span class="control-shield">${icon("check", 17)}</span><span><strong>Purview</strong> governance & lineage</span></div><div><span class="control-shield">${icon("list", 17)}</span><span><strong>Audit trail</strong> human decisions captured</span></div></div>`, "architecture-card")}
    <div class="architecture-caption">Illustrative reference architecture — services and data boundaries are configurable to your enterprise environment.</div>`;
}

function answerFor(question) {
  const prompt = question.toLowerCase();
  if (prompt.includes("largest") || prompt.includes("risk")) {
    return "Largest active regulatory risk is missing mobile pricing disclosure language across customer-care scripts. Estimated exposure is $12M with 95% confidence. Recommended next step: update the disclosure language and route it to Consumer Legal.";
  }
  if (prompt.includes("launch") || prompt.includes("product")) {
    return "11 product launches are under compliance monitoring. Two require immediate legal review: Unlimited Plus Mobile and AI Customer Service Workflow.";
  }
  if (prompt.includes("missing") || prompt.includes("control")) {
    return "Most urgent missing control is approved disclosure text for the call-center channel. The agent recommends a launch hold until the script is updated and logged.";
  }
  if (prompt.includes("privacy") || prompt.includes("ai")) {
    return "The AI customer service workflow has an open privacy review gap, $8.7M in estimated exposure, and 91% agent confidence. Route it to the Privacy Office for assessment before launch.";
  }
  return "The agent recommends prioritizing mobile pricing disclosures, AI customer service privacy review, and accessibility notice publication. Each recommendation is routed to a human legal owner for review.";
}

function commandConsole() {
  return `
    ${card(`<div class="console-top"><div><span class="eyebrow">COMPLIANCE COPILOT</span><h2>Ask your regulatory agent</h2><p>Get a grounded summary of open signals and suggested next steps.</p></div><div class="console-agent">${icon("sparkle", 20)}</div></div>
      <div class="prompt-chips"><button data-prompt="What is our largest active regulatory risk?">What is our largest risk?</button><button data-prompt="Which product launches need review?">Which launches need review?</button><button data-prompt="What is our most urgent missing control?">What control is missing?</button></div>
      <form id="console-form" class="console-form"><label for="console-input" class="sr-only">Ask a question</label><input id="console-input" placeholder="Ask about launches, privacy, disclosures..." value="${escapeHtml(state.consoleQuestion)}" /><button aria-label="Send question" type="submit">${icon("send", 17)}</button></form>
      ${state.consoleAnswer ? `<div class="conversation"><div class="conversation-question">${icon("terminal", 15)} ${escapeHtml(state.consoleQuestion)}</div><div class="conversation-answer"><span class="answer-icon">${icon("sparkle", 16)}</span><p>${escapeHtml(state.consoleAnswer)}</p></div></div>` : `<div class="console-empty"><span class="empty-sparkle">${icon("sparkle", 21)}</span><strong>Your compliance briefing starts here</strong><p>Ask a question or choose a suggested prompt to get started.</p></div>`}
      <div class="console-disclaimer">${icon("shield", 14)} AI-generated summaries are illustrative and require human legal verification.</div>`, "console-card")}
    <div class="console-context">
      <div>${icon("radar", 19)}<div><strong>147</strong><span>active checks</span></div></div><div>${icon("chart", 19)}<div><strong>23</strong><span>high-priority risks</span></div></div><div>${icon("grid", 19)}<div><strong>11</strong><span>launches monitored</span></div></div>
    </div>`;
}

const walkthroughSteps = [
  {
    kicker: "01 / MONITOR",
    title: "See the obligation before the launch.",
    body: "Continuously connect regulatory updates, internal policies, product briefs, and operational signals to the obligations that matter.",
    icon: "radar",
    outcome: "2,420 obligations monitored across 11 launches",
  },
  {
    kicker: "02 / PRIORITIZE",
    title: "Focus legal attention where it matters.",
    body: "Rank potential issues by exposure, confidence, customer impact, and launch timing—not by alert volume alone.",
    icon: "chart",
    outcome: "23 high-priority signals surfaced for review",
  },
  {
    kicker: "03 / INVESTIGATE",
    title: "Make every signal explainable.",
    body: "Give legal teams a clear evidence trail from the product change to the missing control and the affected obligation.",
    icon: "search",
    outcome: "Evidence, confidence, and product context in one view",
  },
  {
    kicker: "04 / RESOLVE",
    title: "Route the next step. Keep people accountable.",
    body: "Prepare suggested remediation and send it to the right owner. Counsel verifies the finding and approves the response.",
    icon: "shield",
    outcome: "96% control coverage with human legal review",
  },
];

function walkthrough() {
  const step = walkthroughSteps[state.walkthroughStep];
  return `
    ${card(`<div class="walkthrough-progress">${walkthroughSteps
      .map(
        (_, index) => `
          <span class="${index <= state.walkthroughStep ? "step-done" : ""}"></span>`,
      )
      .join("")}</div>
      <div class="walkthrough-content"><div class="walkthrough-copy"><span class="eyebrow">${step.kicker}</span><h2>${step.title}</h2><p>${step.body}</p><div class="walkthrough-outcome">${icon("check", 17)} ${step.outcome}</div>
      <div class="walkthrough-controls"><button class="secondary-button" data-walkthrough="prev" ${state.walkthroughStep === 0 ? "disabled" : ""}>Back</button><button class="primary-button" data-walkthrough="next">${state.walkthroughStep === walkthroughSteps.length - 1 ? "Restart walkthrough" : "Next step"} ${icon("arrow", 16)}</button></div>
      </div><div class="walkthrough-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><span class="walkthrough-icon">${icon(step.icon, 33)}</span><span class="orbit-tag orbit-tag-one">DETECT</span><span class="orbit-tag orbit-tag-two">REVIEW</span><span class="orbit-tag orbit-tag-three">ACT</span><div class="orbit-center">AI<span>+</span>LEGAL</div></div></div>`, "walkthrough-card")}
    <div class="walkthrough-caption">A practical decision-support demo. Not legal advice, a compliance certification, or a substitute for counsel.</div>`;
}

function pageContent() {
  const pages = {
    Dashboard: dashboard,
    "Compliance Radar": radar,
    Investigation: investigation,
    "Action Plan": actionPlan,
    "Impact View": impactView,
    "Microsoft Architecture": architecture,
    "Command Console": commandConsole,
    "Executive Walkthrough": walkthrough,
  };
  return pages[state.page]();
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <button class="brand" data-page="Dashboard">
          <span class="brand-mark">${icon("scale", 24)}</span>
          <span><strong>Regulatory Compliance</strong><small>Telco legal AI agent</small></span>
        </button>
        <nav class="main-nav" aria-label="Main navigation">
          ${navigation
            .map(
              ({ name, icon: symbol }) => `
                <button class="nav-item ${state.page === name ? "active" : ""}" data-page="${name}" ${state.page === name ? 'aria-current="page"' : ""}>
                  <span class="nav-icon">${icon(symbol, 18)}</span><span>${name}</span>${name === "Compliance Radar" ? '<span class="nav-count">23</span>' : ""}
                </button>`,
            )
            .join("")}
        </nav>
        <div class="sidebar-bottom">
          <div class="agent-status"><div class="agent-status-title">${icon("shield", 16)}<strong>Agent mode active</strong><span></span></div><p>Monitoring product, privacy, disclosure, spectrum, accessibility, and customer obligations.</p><div class="status-footer"><span>LAST SYNC</span><strong>Just now</strong></div></div>
          <div class="workspace-user"><span class="user-avatar">LC</span><div><strong>Legal & Compliance</strong><small>Enterprise workspace</small></div><span class="user-menu">···</span></div>
        </div>
      </aside>
      <main class="main-area">
        <div class="mobile-topbar"><button class="mobile-brand" data-page="Dashboard"><span class="brand-mark">${icon("scale", 21)}</span><strong>Regulatory Compliance</strong></button><button class="menu-button" id="mobile-menu" aria-label="Open navigation">${icon("menu", 21)}</button></div>
        <div class="mobile-nav-wrap"><select id="mobile-nav" aria-label="Select a page">${navigation
          .map(
            ({ name }) => `<option ${state.page === name ? "selected" : ""}>${name}</option>`,
          )
          .join("")}</select></div>
        <div class="main-content">
          ${pageHeader()}
          <div class="page-content">${pageContent()}</div>
        </div>
        <footer class="app-footer"><span>REGULATORY COMPLIANCE AGENT</span><span>AI-assisted monitoring <i></i> Human legal review</span></footer>
      </main>
    </div>`;
}

function setPage(page) {
  if (!pageDescriptions[page]) return;
  state.page = page;
  render();
  document.querySelector(".main-area").scrollTo(0, 0);
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("button, .clickable-row");
  if (!target) return;

  if (target.dataset.page) {
    setPage(target.dataset.page);
    return;
  }
  if (target.dataset.risk !== undefined) {
    state.riskIndex = Number(target.dataset.risk);
    state.page = "Investigation";
    render();
    return;
  }
  if (target.dataset.filter) {
    state.radarFilter = target.dataset.filter;
    render();
    return;
  }
  if (target.dataset.complete !== undefined) {
    const index = Number(target.dataset.complete);
    if (state.completedActions.has(index)) state.completedActions.delete(index);
    else state.completedActions.add(index);
    render();
    return;
  }
  if (target.dataset.prompt) {
    state.consoleQuestion = target.dataset.prompt;
    state.consoleAnswer = answerFor(state.consoleQuestion);
    render();
    return;
  }
  if (target.dataset.walkthrough) {
    if (target.dataset.walkthrough === "prev") {
      state.walkthroughStep = Math.max(0, state.walkthroughStep - 1);
    } else {
      state.walkthroughStep =
        (state.walkthroughStep + 1) % walkthroughSteps.length;
    }
    render();
  }
  if (target.id === "mobile-menu") {
    document.querySelector(".mobile-nav-wrap").classList.toggle("open");
  }
});

app.addEventListener("keydown", (event) => {
  if (
    (event.key === "Enter" || event.key === " ") &&
    event.target.matches(".clickable-row")
  ) {
    event.preventDefault();
    state.riskIndex = Number(event.target.dataset.risk);
    state.page = "Investigation";
    render();
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "risk-search") {
    const cursor = event.target.selectionStart;
    state.search = event.target.value;
    render();
    const searchField = document.querySelector("#risk-search");
    searchField.focus();
    searchField.setSelectionRange(cursor, cursor);
  }
});

app.addEventListener("change", (event) => {
  if (event.target.id === "mobile-nav") setPage(event.target.value);
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "console-form") return;
  event.preventDefault();
  const field = event.target.querySelector("input");
  const question = field.value.trim();
  if (!question) {
    field.focus();
    return;
  }
  state.consoleQuestion = question;
  state.consoleAnswer = answerFor(question);
  render();
});

render();
