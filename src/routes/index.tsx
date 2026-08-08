import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Worus Fit Store · Suplementos e recompensas" },
      {
        name: "description",
        content:
          "Preview da Worus Fit Store, integrada aos desafios e Worus Coins do aplicativo.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Teko:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});

type Product = {
  id: number;
  name: { pt: string; en: string };
  category: "proteinas" | "pre-treino" | "creatina" | "acessorios";
  price: number;
  priceUSD: number;
  oldPrice?: number;
  image: string;
  tag?: { pt: string; en: string };
  desc: { pt: string; en: string };
};

type Language = "pt" | "en";

const PRODUCTS: Product[] = [
  { id: 1, name: { pt: "Whey Protein 900g", en: "Whey Protein 900g" }, category: "proteinas", price: 189.9, priceUSD: 37.99, image: "/products/whey.webp", tag: { pt: "PREVIEW", en: "PREVIEW" }, desc: { pt: "Produto ilustrativo para a futura seleção de suplementos.", en: "Illustrative item for the future supplement collection." } },
  { id: 2, name: { pt: "Creatina Monohidratada", en: "Creatine Monohydrate" }, category: "creatina", price: 99.9, priceUSD: 19.99, image: "/products/creatine.webp", tag: { pt: "PREVIEW", en: "PREVIEW" }, desc: { pt: "Referência visual para resgate ou desconto com parceiros.", en: "Visual reference for rewards or partner discounts." } },
  { id: 3, name: { pt: "Pré-treino", en: "Pre-workout" }, category: "pre-treino", price: 149.9, priceUSD: 29.99, image: "/products/preworkout.webp", tag: { pt: "PREVIEW", en: "PREVIEW" }, desc: { pt: "Exemplo de item para o catálogo em preparação.", en: "Sample item for the catalog currently in preparation." } },
  { id: 4, name: { pt: "Kit de treino", en: "Training kit" }, category: "acessorios", price: 129.9, priceUSD: 25.99, image: "/products/training-kit.webp", tag: { pt: "PARCEIROS", en: "PARTNERS" }, desc: { pt: "Camiseta, coqueteleira e toalha para futuras parcerias.", en: "Shirt, shaker and towel from future partners." } },
];

const CATEGORIES = [
  { key: "todos", label: { pt: "TODOS", en: "ALL" } },
  { key: "proteinas", label: { pt: "PROTEÍNAS", en: "PROTEIN" } },
  { key: "pre-treino", label: { pt: "PRÉ-TREINO", en: "PRE-WORKOUT" } },
  { key: "creatina", label: { pt: "CREATINA", en: "CREATINE" } },
  { key: "acessorios", label: { pt: "ACESSÓRIOS", en: "ACCESSORIES" } },
] as const;

const COPY = {
  pt: {
    navProducts: "Produtos", navBenefits: "Benefícios", navHow: "Como funciona", navLaunch: "Lançamento", navSpin: "Roleta",
    openCart: "Abrir carrinho", ecosystem: "Ecossistema Worus Fit", heroOne: "TREINE. EVOLUA.", heroTwo: "CONQUISTE", heroTwoEnd: "BENEFÍCIOS.",
    heroText: "Um preview da futura loja conectada aos desafios, à sequência de treinos e aos Worus Coins do aplicativo.", previewCta: "VER O PREVIEW", appCta: "ABRIR O APP",
    productsCount: "Produtos ilustrativos", walletCount: "Carteira integrada", catalogEyebrow: "Catálogo demonstrativo", catalogTitle: "PRODUTOS PLANEJADOS",
    addSimulation: "ADICIONAR À SIMULAÇÃO", buyWith: "Comprar com", benefitsEyebrow: "Um único ecossistema", benefitsTitle: "COMO A LOJA SE CONECTA AO APP",
    launchEyebrow: "Lançamento responsável", launchTitle: "LOJA EM", launchAccent: "PREPARAÇÃO", launchText: "O catálogo, os parceiros e a logística serão validados antes de qualquer compra real. Enquanto isso, use esta página para conhecer a proposta.", appPreview: "VER PREVIEW NO APP",
    spinEyebrow: "Todo dia tem prêmio", spinTitle: "ROLETA WORUS COINS", spinText: "Gire uma vez por dia e ganhe de 5 a 50 Worus Coins. Mantenha sua sequência de treinos ativa para desbloquear bônus extras a cada 7 dias.", spinCta: "GIRAR NO APP",
    statusEyebrow: "Transparência desde o início", statusTitle: "O QUE JÁ FUNCIONA", store: "LOJA", help: "AJUDA", contact: "CONTATO", launch: "Lançamento", benefits: "Benefícios", openApp: "Abrir aplicativo", helpCenter: "Central de ajuda", storeInApp: "Loja no app",
    footerText: "Preview da loja integrada ao aplicativo Worus Fit.", footerBottom: "Catálogo demonstrativo", cartTitle: "SEU CARRINHO", emptyCart: "Seu carrinho está vazio.", checkoutTitle: "Checkout em preparação", checkoutText: "Use este carrinho para simular o pedido. A compra real e os resgates com coins abrem pelo app.", subtotal: "Subtotal", appEquivalent: "Equivalente no app", checkoutNotice: "AVISAR SOBRE CHECKOUT", viewStore: "VER LOJA NO APP",
    added: "Produto adicionado à simulação.", checkoutSoon: "Checkout online em breve. Veja a loja no app Worus Fit.",
  },
  en: {
    navProducts: "Products", navBenefits: "Benefits", navHow: "How it works", navLaunch: "Launch", navSpin: "Daily spin",
    openCart: "Open cart", ecosystem: "Worus Fit ecosystem", heroOne: "TRAIN. IMPROVE.", heroTwo: "UNLOCK", heroTwoEnd: "BENEFITS.",
    heroText: "A preview of the future store connected to challenges, workout streaks and Worus Coins in the app.", previewCta: "VIEW PREVIEW", appCta: "OPEN THE APP",
    productsCount: "Illustrative products", walletCount: "Integrated wallet", catalogEyebrow: "Demo catalog", catalogTitle: "PLANNED PRODUCTS",
    addSimulation: "ADD TO SIMULATION", buyWith: "Buy with", benefitsEyebrow: "One ecosystem", benefitsTitle: "HOW THE STORE CONNECTS TO THE APP",
    launchEyebrow: "A responsible launch", launchTitle: "STORE IN", launchAccent: "PREPARATION", launchText: "The catalog, partners and logistics will be validated before any real purchase. For now, use this page to explore the proposal.", appPreview: "VIEW PREVIEW IN APP",
    spinEyebrow: "A reward every day", spinTitle: "WORUS COINS DAILY SPIN", spinText: "Spin once a day and earn 5 to 50 Worus Coins. Keep your workout streak active to unlock an extra bonus every 7 days.", spinCta: "SPIN IN THE APP",
    statusEyebrow: "Transparent from day one", statusTitle: "WHAT ALREADY WORKS", store: "STORE", help: "HELP", contact: "CONTACT", launch: "Launch", benefits: "Benefits", openApp: "Open app", helpCenter: "Help center", storeInApp: "Store in app",
    footerText: "Store preview integrated with the Worus Fit app.", footerBottom: "Demonstration catalog", cartTitle: "YOUR CART", emptyCart: "Your cart is empty.", checkoutTitle: "Checkout in preparation", checkoutText: "Use this cart to simulate an order. Real purchases and coin rewards will open in the app.", subtotal: "Subtotal", appEquivalent: "Equivalent in app", checkoutNotice: "GET CHECKOUT UPDATES", viewStore: "VIEW STORE IN APP",
    added: "Product added to the simulation.", checkoutSoon: "Online checkout is coming soon. View the store in the Worus Fit app.",
  },
} as const;

// Worus Fit app — same ecosystem, owns the Worus Coins wallet/auth these products can be
// redeemed against. See @shared/schema COINS_PER_BRL_REDEMPTION in that repo for the rate.
const APP_URL = import.meta.env.VITE_APP_URL || "https://projeto-jordao-rats.onrender.com";

// Maps this catalog's product ids to the matching slug seeded in the app's `products`
// table (script/seed-products.ts over there), so we can look up live Worus Coins pricing.
const PRODUCT_SLUGS: Record<number, string> = {
  1: "whey-protein",
  2: "creatina-monohidratada",
  3: "pre-treino",
  4: "kit-treino",
};

function Index() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = window.localStorage.getItem("worus-store-language");
    if (saved === "pt" || saved === "en") return saved;
    return navigator.language.toLowerCase().startsWith("en") ? "en" : "pt";
  });
  const tx = COPY[language];
  const locale = language === "en" ? "en-US" : "pt-BR";
  const currency = language === "en" ? "USD" : "BRL";
  const formatPrice = (product: Product) => new Intl.NumberFormat(locale, { style: "currency", currency }).format(language === "en" ? product.priceUSD : product.price);
  const [filter, setFilter] = useState<string>("todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [coinPrices, setCoinPrices] = useState<Record<string, number>>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.localStorage.setItem("worus-store-language", language);
    document.documentElement.lang = language === "en" ? "en-US" : "pt-BR";
  }, [language]);

  // Live Worus Coins pricing from the app — falls back to "unavailable" (button hidden)
  // if the app is offline, since this is a real cross-service dependency.
  useEffect(() => {
    fetch(`${APP_URL}/api/products`)
      .then((res) => (res.ok ? res.json() : []))
      .then((rows: { slug: string; priceCoins: number }[]) => {
        const bySlug: Record<string, number> = {};
        for (const row of rows) bySlug[row.slug] = row.priceCoins;
        setCoinPrices(bySlug);
      })
      .catch(() => {
        // App unreachable — Worus Coins CTA simply won't show, R$ checkout still works.
      });
  }, []);

  const filtered = useMemo(
    () => (filter === "todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === Number(id));
    return sum + (p ? (language === "en" ? p.priceUSD : p.price) * qty : 0);
  }, 0);
  const coinSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const slug = PRODUCT_SLUGS[Number(id)];
    const priceCoins = coinPrices[slug];
    return sum + (priceCoins ? priceCoins * qty : 0);
  }, 0);
  const canShowCoinSubtotal =
    cartCount > 0 &&
    Object.keys(cart).every((id) => coinPrices[PRODUCT_SLUGS[Number(id)]] != null);

  // Hero spotlight + parallax
  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty("--mx", `${mx}%`);
        hero.style.setProperty("--my", `${my}%`);
        if (stage) {
          const rx = (my - 50) / 8;
          const ry = (mx - 50) / 8;
          stage.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg)`;
        }
      });
    };
    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (id: number) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    showToast(tx.added);
  };
  const updateQty = (id: number, delta: number) => {
    setCart((c) => {
      const next = { ...c };
      const q = (next[id] || 0) + delta;
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  };

  const handleCheckoutInterest = () => {
    showToast(tx.checkoutSoon);
  };

  return (
    <div className="titan-root">
      <style>{CSS}</style>

      {/* HEADER */}
      <header className="t-header">
        <div className="t-container t-nav">
          <a href="#" className="t-logo">
            <span className="t-logo-mark">W</span>
            <span>WORUS FIT <span className="t-logo-accent">STORE</span></span>
          </a>
          <nav className="t-menu">
            <a href="#produtos">{tx.navProducts}</a>
            <a href="#beneficios">{tx.navBenefits}</a>
            <a href="#depoimentos">{tx.navHow}</a>
            <a href="#cupom">{tx.navLaunch}</a>
            <a href="#roleta">{tx.navSpin}</a>
          </nav>
          <div className="t-nav-actions">
            <div className="t-language" role="group" aria-label="Language / Idioma">
              {(["pt", "en"] as const).map((option) => <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} className={language === option ? "active" : ""}>{option.toUpperCase()}</button>)}
            </div>
            <button className="t-cart-btn" onClick={() => setCartOpen(true)} aria-label={tx.openCart}>
              🛒 <span className="t-cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="t-hero" ref={heroRef}>
        <div className="t-hero-grid" />
        <div className="t-hero-spotlight" />
        <div className="t-hero-rays" />
        <div className="t-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ left: `${(i * 53) % 100}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>

        <div className="t-container t-hero-inner">
          <div className="t-hero-copy">
            <span className="t-eyebrow">{tx.ecosystem}</span>
            <h1 className="t-hero-title">
              <span className="reveal">{tx.heroOne}</span>
              <span className="reveal"><span className="t-grad">{tx.heroTwo}</span> {tx.heroTwoEnd}</span>
            </h1>
            <p className="t-hero-sub">
              {tx.heroText}
            </p>
            <div className="t-hero-cta">
              <a href="#produtos" className="t-btn t-btn-primary">{tx.previewCta}</a>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="t-btn t-btn-ghost">{tx.appCta}</a>
            </div>
            <div className="t-stats"><div className="t-stat"><strong>4</strong><span>{tx.productsCount}</span></div><div className="t-stat"><strong>1</strong><span>{tx.walletCount}</span></div></div>
          </div>

          <div className="t-hero-stage-wrap">
            <div className="t-product-halo" />
            <div className="t-stage" ref={stageRef}><img className="t-hero-product-image" src="/products/whey.webp" alt="Preview de Whey Protein" /></div>
          </div>
        </div>

        <div className="t-scroll-cue">SCROLL ▾</div>
      </section>

      {/* MARQUEE */}
      <div className="t-marquee">
        <div className="t-marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div className="t-marquee-row" key={k}>
              {(language === "en" ? ["CATALOG IN PREPARATION", "CONNECTED TO THE WORUS FIT APP", "ILLUSTRATIVE PRICES", "WORUS COINS REWARDS"] : ["CATÁLOGO EM PREPARAÇÃO", "INTEGRADO AO APP WORUS FIT", "PREÇOS ILUSTRATIVOS", "RESGATES COM WORUS COINS"]).map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* PRODUTOS */}
      <section id="produtos" className="t-section">
        <div className="t-container">
          <SectionTitle eyebrow={tx.catalogEyebrow} title={tx.catalogTitle} />

          <div className="t-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`t-chip ${filter === c.key ? "active" : ""}`}
                onClick={() => setFilter(c.key)}
              >
                {c.label[language]}
              </button>
            ))}
          </div>

          <div className="t-grid">
            {filtered.map((p) => (
              <article key={p.id} className="t-card">
                {p.tag && <span className="t-card-tag">{p.tag[language]}</span>}
                <div className="t-card-img"><img src={p.image} alt={p.name[language]} loading="lazy" /></div>
                <h3 className="t-card-name">{p.name[language]}</h3>
                <p className="t-card-desc">{p.desc[language]}</p>
                <div className="t-card-price">
                  {p.oldPrice && language === "pt" && <span className="t-old">R$ {p.oldPrice.toFixed(2)}</span>}
                  <span className="t-new">{formatPrice(p)}</span>
                </div>
                <button className="t-btn t-btn-primary t-btn-sm" onClick={() => addToCart(p.id)}>
                  {tx.addSimulation}
                </button>
                {coinPrices[PRODUCT_SLUGS[p.id]] != null && (
                  <a
                    href={`${APP_URL}/store?highlight=${PRODUCT_SLUGS[p.id]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-btn t-btn-ghost t-btn-sm"
                    style={{ marginTop: 8, width: "100%", textAlign: "center" }}
                  >
                    🪙 {tx.buyWith} {coinPrices[PRODUCT_SLUGS[p.id]].toLocaleString(locale)} Worus Coins
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="t-section t-section-alt">
        <div className="t-container">
          <SectionTitle eyebrow={tx.benefitsEyebrow} title={tx.benefitsTitle} />
          <div className="t-features">
            {[
              ...(language === "en" ? [
                { icon: "01", title: "TRAIN", desc: "Join challenges and keep your workout streak active in the app." },
                { icon: "02", title: "EARN COINS", desc: "Approved check-ins and rewards increase your balance." },
                { icon: "03", title: "TRACK", desc: "View your balance and history in the Worus Fit wallet." },
                { icon: "04", title: "REDEEM", desc: "When the store opens, products and discounts will appear in the app." },
              ] : [
                { icon: "01", title: "TREINE", desc: "Participe de desafios e mantenha sua sequência ativa no app." },
                { icon: "02", title: "GANHE COINS", desc: "Check-ins aprovados e recompensas aumentam seu saldo." },
                { icon: "03", title: "ACOMPANHE", desc: "Consulte seu saldo e o histórico pela carteira Worus Fit." },
                { icon: "04", title: "RESGATE", desc: "Quando a loja abrir, produtos e descontos aparecerão no app." },
              ])
            ].map((f) => (
              <div key={f.title} className="t-feature">
                <div className="t-feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUPOM */}
      <section id="cupom" className="t-section">
        <div className="t-container">
          <div className="t-coupon">
            <div>
              <span className="t-eyebrow">{tx.launchEyebrow}</span>
              <h2 className="t-coupon-title">{tx.launchTitle} <span className="t-grad">{tx.launchAccent}</span></h2>
              <p>{tx.launchText}</p>
              <a href={`${APP_URL}/store`} target="_blank" rel="noopener noreferrer" className="t-btn t-btn-primary" style={{ marginTop: 20 }}>{tx.appPreview}</a>
            </div>
            <div className="t-coupon-art">W</div>
          </div>
        </div>
      </section>

      {/* ROLETA WORUS COINS */}
      <section id="roleta" className="t-section">
        <div className="t-container">
          <SectionTitle eyebrow={tx.spinEyebrow} title={tx.spinTitle} />
          <div className="t-coupon">
            <div>
              <p>{tx.spinText}</p>
              <a
                href={`${APP_URL}/roulette`}
                target="_blank"
                rel="noopener noreferrer"
                className="t-btn t-btn-primary"
                style={{ marginTop: 16, display: "inline-flex" }}
              >
                {tx.spinCta} →
              </a>
            </div>
            <div
              className="t-coupon-art"
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background:
                  "conic-gradient(#1a1a1a 0% 25%, #0f2e1f 25% 50%, #0f4a2e 50% 75%, #facc15 75% 100%)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
            />
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="t-section t-section-alt">
        <div className="t-container">
          <SectionTitle eyebrow={tx.statusEyebrow} title={tx.statusTitle} />
          <div className="t-testimonials">
            {[
              ...(language === "en" ? [
                { n: "Challenges", r: "Available in app", t: "Groups, check-ins and rankings for different sports." },
                { n: "Worus Coins", r: "Available in app", t: "Wallet, PIX purchases and daily spin rewards." },
                { n: "Store", r: "In preparation", t: "Visual preview while catalog, partners and operations are defined." },
              ] : [
                { n: "Desafios", r: "Disponível no app", t: "Criação de grupos, check-ins e ranking para diferentes esportes." },
                { n: "Worus Coins", r: "Disponível no app", t: "Carteira, compra por PIX e recompensas da roleta diária." },
                { n: "Loja", r: "Em preparação", t: "Preview visual enquanto catálogo, parceiros e operação são definidos." },
              ])
            ].map((t) => (
              <div key={t.n} className="t-test">
                <div className="t-stars">STATUS</div>
                <p>{t.t}</p>
                <div className="t-test-author">
                  <strong>{t.n}</strong>
                  <span>{t.r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="t-footer">
        <div className="t-container">
          <div className="t-foot-grid">
            <div>
              <a href="#" className="t-logo">
                <span className="t-logo-mark">W</span>
                <span>WORUS FIT <span className="t-logo-accent">STORE</span></span>
              </a>
              <p className="t-foot-desc">{tx.footerText}</p>
            </div>
            <div>
              <h5>{tx.store}</h5>
              <a href="#produtos">{tx.navProducts}</a>
              <a href="#cupom">{tx.launch}</a>
              <a href="#beneficios">{tx.benefits}</a>
            </div>
            <div>
              <h5>{tx.help}</h5>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">{tx.openApp}</a>
              <a href={`${APP_URL}/help`} target="_blank" rel="noopener noreferrer">{tx.helpCenter}</a>
            </div>
            <div>
              <h5>{tx.contact}</h5>
              <a href={`${APP_URL}/store`} target="_blank" rel="noopener noreferrer">{tx.storeInApp}</a>
            </div>
          </div>
          <div className="t-foot-bot">
            © {new Date().getFullYear()} Worus Fit Store · {tx.footerBottom}
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <div className={`t-drawer ${cartOpen ? "open" : ""}`}>
        <div className="t-drawer-back" onClick={() => setCartOpen(false)} />
        <aside className="t-drawer-panel">
          <header>
            <h3>{tx.cartTitle}</h3>
            <button onClick={() => setCartOpen(false)}>✕</button>
          </header>
          <div className="t-drawer-body">
            {cartCount === 0 && <p className="t-empty">{tx.emptyCart}</p>}
            {Object.entries(cart).map(([id, qty]) => {
              const p = PRODUCTS.find((x) => x.id === Number(id))!;
              return (
                <div className="t-line" key={id}>
                  <div className="t-line-img"><img src={p.image} alt="" /></div>
                  <div className="t-line-info">
                    <strong>{p.name[language]}</strong>
                    <span>{formatPrice(p)}</span>
                  </div>
                  <div className="t-qty">
                    <button onClick={() => updateQty(p.id, -1)}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => updateQty(p.id, +1)}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
          <footer>
            <div className="t-cart-note">
              <strong>{tx.checkoutTitle}</strong>
              <span>{tx.checkoutText}</span>
            </div>
            <div className="t-subtotal">
              <span>{tx.subtotal}</span>
              <strong>{new Intl.NumberFormat(locale, { style: "currency", currency }).format(subtotal)}</strong>
            </div>
            {canShowCoinSubtotal && (
              <div className="t-subtotal t-subtotal-coins">
                <span>{tx.appEquivalent}</span>
                <strong>{coinSubtotal.toLocaleString(locale)} coins</strong>
              </div>
            )}
            <button className="t-btn t-btn-primary" disabled={cartCount === 0} onClick={handleCheckoutInterest}>
              {tx.checkoutNotice} →
            </button>
            <a
              href={`${APP_URL}/store`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-btn t-btn-ghost"
              style={{ width: "100%", marginTop: 10 }}
            >
              {tx.viewStore}
            </a>
          </footer>
        </aside>
      </div>

      {/* TOAST */}
      {toast && <div className="t-toast">{toast}</div>}
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="t-section-title">
      <span className="t-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

const CSS = `
.titan-root {
  --bg-0: #0a0a0a;
  --bg-1: #111;
  --bg-2: #1a1a1a;
  --bg-3: #232323;
  --fg: #f5f5f5;
  --muted: #9a9a9a;
  --accent: #E10600;
  --accent-glow: #FF6A00;
  --ember: #FFB347;
  --grad-brand: linear-gradient(135deg, #E10600 0%, #FF6A00 60%, #FFB347 100%);
  --shadow-red: 0 10px 40px -10px rgba(225,6,0,.6);
  --shadow-red-strong: 0 20px 80px -10px rgba(255,106,0,.7);
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--fg);
  background: var(--bg-0);
  min-height: 100vh;
}
.titan-root *, .titan-root *::before, .titan-root *::after { box-sizing: border-box; }
.titan-root a { color: inherit; text-decoration: none; }
.titan-root h1,.titan-root h2,.titan-root h3,.titan-root h4,.titan-root h5 {
  font-family: 'Oswald', 'Teko', sans-serif; letter-spacing: .02em; margin: 0;
}
.titan-root ::selection { background: var(--accent); color: #fff; }
.t-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
.t-grad { background: var(--grad-brand); -webkit-background-clip: text; background-clip: text; color: transparent; }

/* HEADER */
.t-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(10,10,10,.75); backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.t-nav { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
.t-logo { font-family: 'Oswald'; font-weight: 700; font-size: 22px; display: flex; align-items: center; gap: 8px; letter-spacing: .04em; }
.t-logo-mark { color: var(--accent); filter: drop-shadow(0 0 8px var(--accent-glow)); }
.t-logo-accent { color: var(--accent); }
.t-menu { display: flex; gap: 28px; font-weight: 500; font-size: 14px; }
.t-menu a { color: var(--muted); transition: color .2s; }
.t-menu a:hover { color: var(--fg); }
.t-nav-actions { display: flex; align-items: center; gap: 10px; }
.t-language { display: inline-flex; height: 38px; padding: 3px; border: 1px solid rgba(255,255,255,.1); border-radius: 8px; background: rgba(0,0,0,.25); }
.t-language button { min-width: 34px; border: 0; border-radius: 5px; background: transparent; color: var(--muted); font: 700 10px 'Inter', sans-serif; cursor: pointer; }
.t-language button.active { background: var(--accent); color: #fff; }
.t-cart-btn {
  position: relative; background: var(--bg-2); border: 1px solid rgba(255,255,255,.08); color: var(--fg);
  width: 44px; height: 44px; border-radius: 12px; cursor: pointer; font-size: 18px; transition: all .2s;
}
.t-cart-btn:hover { border-color: var(--accent); transform: translateY(-2px); }
.t-cart-badge {
  position: absolute; top: -6px; right: -6px;
  background: var(--grad-brand); color: #fff; font-size: 11px; font-weight: 700;
  min-width: 20px; height: 20px; border-radius: 10px; display: grid; place-items: center; padding: 0 6px;
}
@media (max-width: 768px) { .t-menu { display: none; } }

/* HERO */
.t-hero {
  position: relative; overflow: hidden; padding: 80px 0 100px;
  --mx: 50%; --my: 30%;
  background: radial-gradient(1200px 600px at 50% -10%, rgba(225,6,0,.18), transparent 60%), var(--bg-0);
}
.t-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 80%);
  animation: drift 30s linear infinite;
}
@keyframes drift { to { background-position: 60px 60px; } }
.t-hero-spotlight {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(400px circle at var(--mx) var(--my), rgba(255,106,0,.18), transparent 60%);
  transition: background .15s;
}
.t-hero-rays {
  position: absolute; left: 50%; top: -10%; width: 600px; height: 800px; transform: translateX(-50%);
  background: conic-gradient(from 200deg at 50% 0%, transparent 0deg, rgba(255,106,0,.12) 30deg, transparent 60deg, rgba(225,6,0,.1) 90deg, transparent 130deg);
  filter: blur(20px); opacity: .7; pointer-events: none;
}
.t-particles { position: absolute; inset: 0; pointer-events: none; }
.t-particles span {
  position: absolute; bottom: -10px; width: 4px; height: 4px; border-radius: 50%;
  background: var(--accent-glow); box-shadow: 0 0 12px var(--accent-glow);
  animation: rise 9s linear infinite;
}
@keyframes rise { to { transform: translateY(-110vh); opacity: 0; } }

.t-hero-inner { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; gap: 60px; align-items: center; }
@media (max-width: 920px) { .t-hero-inner { grid-template-columns: 1fr; gap: 40px; } }

.t-eyebrow {
  display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: .25em;
  color: var(--ember); padding: 6px 14px; border: 1px solid rgba(255,106,0,.3);
  border-radius: 100px; background: rgba(255,106,0,.06); margin-bottom: 20px;
}
.t-hero-title {
  font-size: clamp(48px, 7vw, 96px); line-height: .95; font-weight: 700; letter-spacing: .01em;
  text-transform: uppercase; margin-bottom: 24px;
}
.t-hero-title span { display: block; opacity: 0; transform: translateY(40px); animation: revealUp .9s forwards; }
.t-hero-title span:nth-child(1) { animation-delay: .15s; }
.t-hero-title span:nth-child(2) { animation-delay: .35s; }
@keyframes revealUp { to { opacity: 1; transform: none; } }

.t-hero-sub { font-size: 18px; line-height: 1.6; color: var(--muted); max-width: 520px; margin-bottom: 36px; }
.t-hero-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 50px; }

.t-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 16px 28px; border-radius: 12px; font-family: 'Oswald'; font-weight: 600;
  letter-spacing: .12em; font-size: 14px; cursor: pointer; border: none;
  transition: transform .2s, box-shadow .2s, filter .2s;
}
.t-btn-primary { background: var(--grad-brand); color: #fff; box-shadow: var(--shadow-red); }
.t-btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-red-strong); filter: brightness(1.05); }
.t-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
.t-btn-ghost { background: transparent; color: var(--fg); border: 1px solid rgba(255,255,255,.18); }
.t-btn-ghost:hover { border-color: var(--accent); color: var(--accent-glow); }
.t-btn-sm { padding: 12px 20px; font-size: 13px; width: 100%; }

.t-stats { display: flex; gap: 40px; }
.t-stat strong { font-family: 'Oswald'; font-size: 32px; display: block; color: var(--fg); }
.t-stat span { font-size: 12px; color: var(--muted); letter-spacing: .15em; text-transform: uppercase; }

/* HERO STAGE */
.t-hero-stage-wrap { position: relative; perspective: 1200px; min-height: 480px; display: grid; place-items: center; }
.t-product-halo {
  position: absolute; width: 420px; height: 420px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,106,0,.4), transparent 60%);
  animation: breathe 4s ease-in-out infinite;
}
@keyframes breathe { 0%,100% { transform: scale(.9); opacity: .7; } 50% { transform: scale(1.1); opacity: 1; } }
.t-stage { position: relative; transform-style: preserve-3d; transition: transform .15s; }

.t-product-3d {
  position: relative; width: 220px; height: 340px;
  filter: drop-shadow(0 30px 40px rgba(0,0,0,.6));
}
.t-hero-product-image { width: min(430px, 80vw); aspect-ratio: 1; object-fit: cover; border-radius: 8px; box-shadow: 0 28px 70px rgba(0,0,0,.55); }
.t-lid {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 180px; height: 50px; border-radius: 12px 12px 4px 4px;
  background: linear-gradient(180deg, #2a2a2a, #0a0a0a);
  border: 1px solid #333;
}
.t-body {
  position: absolute; top: 40px; left: 0; right: 0; bottom: 0;
  border-radius: 18px;
  background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
  border: 1px solid #2a2a2a; padding: 30px 20px;
  display: flex; align-items: center; justify-content: center;
}
.t-label {
  width: 100%; padding: 24px 12px; border-radius: 8px;
  background: linear-gradient(135deg, rgba(225,6,0,.15), rgba(255,106,0,.1));
  border: 1px solid rgba(225,6,0,.4); text-align: center;
}
.t-label-top { display: block; font-family: 'Oswald'; font-weight: 700; font-size: 28px; color: #fff; letter-spacing: .1em; }
.t-label-mid { display: block; font-family: 'Teko'; font-size: 56px; font-weight: 700; line-height: 1; background: var(--grad-brand); -webkit-background-clip: text; background-clip: text; color: transparent; }
.t-label-bot { display: block; font-size: 11px; color: var(--muted); letter-spacing: .25em; margin-top: 8px; }

.t-badge {
  position: absolute; padding: 8px 14px; border-radius: 100px;
  background: var(--bg-2); border: 1px solid rgba(255,106,0,.4);
  font-size: 12px; font-weight: 600; color: var(--ember);
  box-shadow: 0 6px 20px rgba(0,0,0,.4); animation: float 4s ease-in-out infinite;
}
.t-badge-1 { top: 10%; left: -20px; animation-delay: 0s; }
.t-badge-2 { top: 50%; right: -30px; animation-delay: 1.3s; }
.t-badge-3 { bottom: 10%; left: 0; animation-delay: 2.6s; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

.t-scroll-cue {
  position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
  font-size: 11px; color: var(--muted); letter-spacing: .3em; animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100% { opacity: .4; } 50% { opacity: 1; } }

/* MARQUEE */
.t-marquee {
  background: var(--grad-brand); padding: 14px 0; overflow: hidden;
  border-top: 1px solid rgba(0,0,0,.2); border-bottom: 1px solid rgba(0,0,0,.2);
}
.t-marquee-track { display: flex; animation: scroll 30s linear infinite; gap: 60px; }
.t-marquee-row { display: flex; gap: 60px; flex-shrink: 0; }
.t-marquee-row span { font-family: 'Oswald'; font-weight: 600; font-size: 14px; letter-spacing: .15em; color: #fff; white-space: nowrap; }
@keyframes scroll { to { transform: translateX(-50%); } }

/* SECTION */
.t-section { padding: 100px 0; }
.t-section-alt { background: var(--bg-1); }
.t-section-title { text-align: center; margin-bottom: 60px; }
.t-section-title h2 { font-size: clamp(36px, 5vw, 64px); font-weight: 700; text-transform: uppercase; margin-top: 12px; }

/* FILTERS */
.t-filters { display: flex; gap: 12px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap; }
.t-chip {
  padding: 10px 20px; border-radius: 100px; background: var(--bg-2);
  border: 1px solid rgba(255,255,255,.08); color: var(--muted); cursor: pointer;
  font-family: 'Oswald'; font-weight: 600; font-size: 13px; letter-spacing: .15em; transition: all .2s;
}
.t-chip:hover { color: var(--fg); border-color: rgba(255,255,255,.2); }
.t-chip.active { background: var(--grad-brand); color: #fff; border-color: transparent; box-shadow: var(--shadow-red); }

/* GRID */
.t-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.t-card {
  position: relative; background: var(--bg-2); border: 1px solid rgba(255,255,255,.06);
  border-radius: 18px; padding: 24px; transition: all .3s; animation: fadeUp .5s both;
}
.t-card:hover { transform: translateY(-6px); border-color: rgba(225,6,0,.4); box-shadow: var(--shadow-red); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } }
.t-card-tag {
  position: absolute; top: 16px; right: 16px; background: var(--grad-brand); color: #fff;
  font-family: 'Oswald'; font-size: 10px; font-weight: 700; letter-spacing: .15em;
  padding: 4px 10px; border-radius: 100px;
}
.t-card-img {
  height: 160px; border-radius: 12px; margin-bottom: 16px;
  background: radial-gradient(circle at 50% 60%, rgba(225,6,0,.2), transparent 70%), var(--bg-3);
  display: grid; place-items: center; overflow: hidden;
}
.t-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
.t-card:hover .t-card-img img { transform: scale(1.035); }
.t-card-name { font-size: 20px; margin-bottom: 6px; text-transform: uppercase; }
.t-card-desc { font-size: 13px; color: var(--muted); margin: 0 0 16px; line-height: 1.5; }
.t-card-price { display: flex; align-items: baseline; gap: 10px; margin-bottom: 16px; }
.t-old { font-size: 13px; color: var(--muted); text-decoration: line-through; }
.t-new { font-family: 'Oswald'; font-size: 24px; font-weight: 700; color: var(--accent-glow); }

/* FEATURES */
.t-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1px; background: rgba(255,255,255,.06); border-radius: 18px; overflow: hidden; }
.t-feature { background: var(--bg-1); padding: 32px 24px; transition: background .2s; }
.t-feature:hover { background: var(--bg-2); }
.t-feature-icon { font-size: 36px; margin-bottom: 14px; }
.t-feature h4 { font-size: 18px; margin-bottom: 8px; text-transform: uppercase; }
.t-feature p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.5; }

/* COUPON */
.t-coupon {
  background: linear-gradient(135deg, var(--bg-2), var(--bg-1));
  border: 1px solid rgba(255,106,0,.3); border-radius: 24px; padding: 50px;
  display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center;
  position: relative; overflow: hidden;
}
.t-coupon::before {
  content: ''; position: absolute; inset: -1px; border-radius: 24px;
  background: var(--grad-brand); z-index: -1; opacity: .3;
  filter: blur(40px);
}
.t-countdown { display: flex; gap: 12px; margin: 16px 0 24px; }
.t-count-box {
  background: var(--bg-0); border: 1px solid rgba(255,255,255,.08);
  border-radius: 10px; padding: 12px 16px; text-align: center; min-width: 70px;
}
.t-count-box strong { font-family: 'Teko'; font-size: 36px; line-height: 1; display: block; color: var(--accent-glow); }
.t-count-box span { font-size: 10px; letter-spacing: .2em; color: var(--muted); }
.t-coupon-title { font-size: clamp(36px, 5vw, 60px); margin-bottom: 12px; text-transform: uppercase; }
.t-coupon-code {
  display: inline-flex; align-items: center; gap: 16px; margin-top: 16px;
  background: var(--bg-0); border: 2px dashed var(--accent); padding: 14px 22px;
  border-radius: 12px; cursor: pointer; transition: all .2s;
}
.t-coupon-code:hover { background: var(--bg-2); }
.t-coupon-code span:first-child { font-family: 'Oswald'; font-size: 24px; font-weight: 700; letter-spacing: .2em; color: var(--accent-glow); }
.t-copy { font-size: 11px; color: var(--muted); letter-spacing: .2em; padding: 6px 10px; border-radius: 6px; background: var(--bg-2); }
.t-coupon-art { font-size: 180px; line-height: 1; filter: drop-shadow(0 0 30px var(--accent)); animation: pulse-fire 2s ease-in-out infinite; }
@keyframes pulse-fire { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
@media (max-width: 768px) { .t-coupon { grid-template-columns: 1fr; padding: 30px; } .t-coupon-art { font-size: 100px; text-align: center; } }

/* TESTIMONIALS */
.t-testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.t-test { background: var(--bg-2); border: 1px solid rgba(255,255,255,.06); border-radius: 18px; padding: 28px; }
.t-stars { color: var(--ember); margin-bottom: 14px; letter-spacing: 4px; }
.t-test p { font-size: 15px; line-height: 1.6; color: var(--fg); margin: 0 0 20px; }
.t-test-author strong { display: block; font-family: 'Oswald'; }
.t-test-author span { font-size: 12px; color: var(--muted); letter-spacing: .1em; }

/* FOOTER */
.t-footer { background: var(--bg-1); padding: 60px 0 24px; border-top: 1px solid rgba(255,255,255,.06); }
.t-foot-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 40px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,.06); }
@media (max-width: 768px) { .t-foot-grid { grid-template-columns: 1fr 1fr; } }
.t-foot-grid h5 { font-size: 13px; letter-spacing: .2em; margin-bottom: 16px; color: var(--ember); }
.t-foot-grid a { display: block; font-size: 14px; color: var(--muted); margin-bottom: 10px; transition: color .2s; }
.t-foot-grid a:hover { color: var(--fg); }
.t-foot-desc { color: var(--muted); margin-top: 12px; font-size: 14px; }
.t-foot-bot { padding-top: 24px; text-align: center; color: var(--muted); font-size: 13px; }

/* DRAWER */
.t-drawer { position: fixed; inset: 0; z-index: 100; pointer-events: none; }
.t-drawer.open { pointer-events: auto; }
.t-drawer-back { position: absolute; inset: 0; background: rgba(0,0,0,.6); opacity: 0; transition: opacity .3s; backdrop-filter: blur(4px); }
.t-drawer.open .t-drawer-back { opacity: 1; }
.t-drawer-panel {
  position: absolute; right: 0; top: 0; bottom: 0; width: 100%; max-width: 420px;
  background: var(--bg-1); border-left: 1px solid rgba(255,255,255,.06);
  display: flex; flex-direction: column; transform: translateX(100%); transition: transform .3s;
}
.t-drawer.open .t-drawer-panel { transform: none; }
.t-drawer-panel header { display: flex; justify-content: space-between; align-items: center; padding: 24px; border-bottom: 1px solid rgba(255,255,255,.06); }
.t-drawer-panel header h3 { font-size: 18px; letter-spacing: .15em; }
.t-drawer-panel header button { background: none; border: none; color: var(--fg); font-size: 22px; cursor: pointer; }
.t-drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
.t-empty { color: var(--muted); text-align: center; padding: 40px 0; }
.t-line { display: grid; grid-template-columns: 60px 1fr auto; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
.t-line-img { width: 60px; height: 60px; border-radius: 10px; background: var(--bg-2); display: grid; place-items: center; overflow: hidden; }
.t-line-img img { width: 100%; height: 100%; object-fit: cover; }
.t-line-info strong { display: block; font-size: 14px; }
.t-line-info span { font-size: 13px; color: var(--accent-glow); font-weight: 600; }
.t-qty { display: flex; align-items: center; gap: 8px; }
.t-qty button { width: 28px; height: 28px; border-radius: 6px; background: var(--bg-2); border: 1px solid rgba(255,255,255,.08); color: var(--fg); cursor: pointer; }
.t-qty span { min-width: 20px; text-align: center; font-weight: 600; }
.t-drawer-panel footer { padding: 24px; border-top: 1px solid rgba(255,255,255,.06); }
.t-cart-note {
  border: 1px solid rgba(255,106,0,.22);
  background: rgba(255,106,0,.08);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
}
.t-cart-note strong { display: block; font-size: 13px; margin-bottom: 4px; color: var(--ember); }
.t-cart-note span { display: block; font-size: 12px; line-height: 1.45; color: var(--muted); }
.t-subtotal { display: flex; justify-content: space-between; margin-bottom: 16px; }
.t-subtotal strong { font-family: 'Oswald'; font-size: 22px; color: var(--accent-glow); }
.t-subtotal-coins { margin-top: -8px; }
.t-subtotal-coins strong { font-size: 17px; color: var(--ember); }
.t-drawer-panel footer .t-btn { width: 100%; }

/* TOAST */
.t-toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 200;
  background: var(--bg-2); border: 1px solid rgba(255,106,0,.4); color: var(--fg);
  padding: 14px 22px; border-radius: 12px; font-size: 14px; font-weight: 500;
  box-shadow: 0 10px 40px rgba(0,0,0,.5); animation: toastIn .3s;
}
@keyframes toastIn { from { transform: translate(-50%, 20px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .titan-root *, .titan-root *::before, .titan-root *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
.titan-root :focus-visible { outline: 2px solid var(--ember); outline-offset: 3px; }
@media (max-width: 640px) {
  .t-container { padding: 0 16px; }
  .t-nav { height: 64px; gap: 8px; }
  .t-logo { font-size: 14px; gap: 5px; }
  .t-nav-actions { gap: 6px; }
  .t-language button { min-width: 30px; }
  .t-hero { padding: 56px 0 68px; }
  .t-hero-inner { gap: 24px; }
  .t-hero-title { font-size: 42px; line-height: 1; }
  .t-hero-sub { font-size: 15px; margin-bottom: 24px; }
  .t-hero-cta { margin-bottom: 30px; }
  .t-hero-cta .t-btn { width: 100%; }
  .t-stats { gap: 20px; }
  .t-stat strong { font-size: 24px; }
  .t-hero-stage-wrap { min-height: 320px; }
  .t-product-halo { width: 290px; height: 290px; }
  .t-section { padding: 64px 0; }
  .t-section-title { margin-bottom: 34px; }
  .t-section-title h2 { font-size: 34px; }
  .t-grid { grid-template-columns: 1fr; }
  .t-card, .t-features, .t-coupon, .t-test { border-radius: 8px; }
  .t-coupon { padding: 24px 18px; }
  .t-coupon-art { font-size: 72px; }
  .t-foot-grid { grid-template-columns: 1fr; gap: 28px; }
  .t-drawer-panel header, .t-drawer-panel footer { padding: 18px 16px; }
  .t-drawer-body { padding: 12px 16px; }
}
`;
