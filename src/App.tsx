import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react"

type Role = "none" | "guest" | "member"
type Theme = "gold" | "mono"
type Page = "home" | "about" | "constitution" | "sanctuary" | "duel" | "weapons" | "guides" | "tips"

const PHOTO =
  "https://images.unsplash.com/photo-1772962646447-d91ed9198d80?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600"

const icons: Record<string, ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9 20v-6h6v6" />,
  about: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 20c.5-4 2.5-6 6.5-6s6 2 6.5 6" />
    </>
  ),
  constitution: (
    <>
      <path d="M6 3h12v18H6z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </>
  ),
  sanctuary: (
    <>
      <path d="M4 21h16M6 21v-9l6-7 6 7v9M9 21v-5h6v5M4 12l8-9 8 9" />
    </>
  ),
  duel: (
    <>
      <path d="m6 4 14 14M18 4 4 18M5 3l3 1-4 4-1-3ZM19 3l-3 1 4 4 1-3Z" />
    </>
  ),
  weapons: (
    <>
      <path d="m14 5 5-2-2 5L8 17l-3 1 1-3Z" />
      <path d="m12 10 4 4M5 19l-2 2" />
    </>
  ),
  guides: (
    <>
      <path d="M4 5c4-2 6-1 8 1v15c-2-2-4-3-8-1ZM20 5c-4-2-6-1-8 1v15c2-2 4-3 8-1Z" />
    </>
  ),
  tips: (
    <>
      <path d="M8 14c-3-3-2-9 4-9s7 6 4 9c-1 1-2 2-2 4h-4c0-2-1-3-2-4Z" />
      <path d="M10 21h4M9 18h6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
    </>
  ),
  chevron: <path d="m7 10 5 5 5-5" />,
  zoom: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M10.5 8v5M8 10.5h5" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  logout: (
    <>
      <path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" />
    </>
  ),
}

function Icon({ name, size = 19 }: { name: string size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

const nav: { id: Page label: string icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About us", icon: "about" },
  { id: "constitution", label: "Constitution", icon: "constitution" },
  { id: "sanctuary", label: "Sanctuary", icon: "sanctuary" },
  { id: "duel", label: "Alliance Duel", icon: "duel" },
  { id: "weapons", label: "Weapons", icon: "weapons" },
  { id: "guides", label: "Guides", icon: "guides" },
  { id: "tips", label: "Share a tip", icon: "tips" },
]

const guides = [
  "Foto de perfil y nombre",
  "Ministro",
  "Códigos de regalo",
  "Ayuda a miembros",
  "Elixir Scramble",
  "Thief Hunt",
  "Crystal Valley",
  "Wisdom Trial",
  "Sincronizar batallas",
]

const duelDays = [
  [
    "Día I",
    "Radar Training",
    "Completa tareas de radar, usa resistencia y reúne recursos.",
  ],
  [
    "Día II",
    "Base Expansion",
    "Mejora edificios y consume aceleradores de construcción.",
  ],
  [
    "Día III",
    "Age of Science",
    "Investiga tecnologías y utiliza medallas de valor.",
  ],
  [
    "Día IV",
    "Hero Initiative",
    "Recluta y mejora héroes. Reserva tus fragmentos.",
  ],
  [
    "Día V",
    "Total Mobilization",
    "Entrena tropas y completa las misiones del radar.",
  ],
  [
    "Día VI",
    "Enemy Buster",
    "Elimina tropas enemigas y protege a los recolectores.",
  ],
]

function Sigil({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`sigil ${compact ? "sigil--compact" : ""}`}
      aria-label="ANS"
    >
      <div className="sigil__halo" />
      <svg viewBox="0 0 160 190" role="img">
        <path
          className="sigil__shield"
          d="M80 8 143 31v62c0 42-26 72-63 89C43 165 17 135 17 93V31Z"
        />
        <path className="sigil__line" d="M80 8v174M17 67h126" />
        <path
          className="sigil__bird"
          d="M42 56c20-27 34-25 38-6 4-19 18-21 38 6-16-8-24-2-29 6h-18c-5-8-13-14-29-6Z"
        />
        <path
          className="sigil__fleur"
          d="M80 50c-8 12-12 18-7 27h-9c-7-8-8-14-5-21-10 4-13 13-8 22 4 6 10 8 17 6-1 8-4 13-9 18h17v14H64v9h12v22h8v-22h12v-9H84v-14h17c-5-5-8-10-9-18 7 2 13 0 17-6 5-9 2-18-8-22 3 7 2 13-5 21h-9c5-9 1-15-7-27Z"
        />
      </svg>
      {!compact && <span>ANS</span>}
    </div>
  )
}

function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <i />
      <span>♢</span>
      <i />
    </div>
  )
}

function PageTitle({
  eyebrow,
  children,
}: {
  eyebrow: string
  children: ReactNode
}) {
  return (
    <header className="page-title reveal">
      <p>{eyebrow}</p>
      <h1>{children}</h1>
      <Flourish />
    </header>
  )
}

function Locked() {
  return (
    <div className="locked reveal">
      <div className="locked__crest">⚜</div>
      <p>Contenido protegido</p>
      <h3>Para ver este contenido debes loggearte como miembro</h3>
      <span>Los secretos de la alianza permanecen bajo sello.</span>
    </div>
  )
}

function FlipCard({
  number,
  title,
  text,
  foot,
}: {
  number: string
  title: string
  text: string
  foot?: string
}) {
  return (
    <article className="flip-card" tabIndex={0}>
      <div className="flip-card__inner">
        <div className="flip-card__front">
          <span className="card-number">{number}</span>
          <div className="card-glyph">⚜</div>
          <h3>{title}</h3>
          <p>Posa el cursor para revelar</p>
        </div>
        <div className="flip-card__back">
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{text}</p>
          {foot && <small>{foot}</small>}
        </div>
      </div>
    </article>
  )
}

function Home({
  role,
  setRole,
  setPage,
}: {
  role: Role
  setRole: (r: Role) => void
  setPage: (p: Page) => void
}) {
  const [notified, setNotified] = useState(false)
  return (
    <>
      <section className="hero reveal">
        <img src={PHOTO} alt="" className="hero__image" />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="overline">Last Asylum Plague · Server #233</p>
          <h1>
            <span>We are</span> ANS
          </h1>
          <Flourish />
          <p className="hero__copy">
            In the shadow of the plague, we do not merely survive.
            <br />
            We endure. We conquer. We rise together.
          </p>
          <div className="hero__actions">
            <button
              className="seal-button"
              onClick={() =>
                document
                  .getElementById("login")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Enter the sanctuary <Icon name="arrow" size={17} />
            </button>
            <button className="text-button" onClick={() => setPage("about")}>
              Discover our oath
            </button>
          </div>
        </div>
        <div className="scroll-mark">
          <span>SCROLL TO DESCEND</span>
          <i />
        </div>
      </section>

      <section className="intro section-pad reveal">
        <div className="intro__art">
          <Sigil />
        </div>
        <div className="intro__copy">
          <p className="overline">Welcome, survivor</p>
          <h2>
            Strength forged
            <br />
            in darkness
          </h2>
          <Flourish />
          <p>
            ANS is more than an alliance. We are a sworn brotherhood built in
            the ashes of a fallen world — united by strategy, loyalty, and an
            unbreakable will to prevail.
          </p>
          <blockquote>
            “Alone we survive. Together, we become legend.”
          </blockquote>
          <button className="iron-button" onClick={() => setPage("about")}>
            Know our story
          </button>
        </div>
      </section>

      <section id="login" className="login-section section-pad reveal">
        <PageTitle eyebrow="Choose your path">Enter the alliance</PageTitle>
        <div className="login-grid">
          <button
            className={`login-card ${role === "guest" ? "active" : ""}`}
            onClick={() => setRole("guest")}
          >
            <span className="login-card__icon">◇</span>
            <small>Wanderer</small>
            <strong>Login as a guest</strong>
            <p>Explore public records and guides.</p>
          </button>
          <button
            className={`login-card featured ${
              role === "member" ? "active" : ""
            }`}
            onClick={() => setRole("member")}
          >
            <span className="login-card__icon">⚜</span>
            <small>Sworn one</small>
            <strong>Member access</strong>
            <p>Enter the complete alliance archive.</p>
          </button>
          <button
            className={`login-card ${role === "none" ? "active" : ""}`}
            onClick={() => setRole("none")}
          >
            <span className="login-card__icon">✧</span>
            <small>Unknown</small>
            <strong>Remain in shadows</strong>
            <p>Return to the public threshold.</p>
          </button>
        </div>
        {role !== "none" && (
          <p className="session-note">
            Sesión activa como{" "}
            <b>{role === "member" ? "miembro ANS" : "invitado"}</b>.
          </p>
        )}
      </section>

      <section className="signal section-pad reveal">
        <div className="signal__icon">
          <Icon name="bell" size={30} />
        </div>
        <div>
          <p className="overline">The raven bears news</p>
          <h2>Never miss the call</h2>
          <p>
            Recibe alertas de eventos y órdenes importantes en Android y iOS.
          </p>
        </div>
        <button className="iron-button" onClick={() => setNotified(true)}>
          {notified ? "Notifications enabled" : "Enable notifications"}
        </button>
      </section>

      <section className="video-section section-pad reveal">
        <PageTitle eyebrow="From the battlefield">
          Latest transmission
        </PageTitle>
        <div className="video-frame">
          <div className="video-placeholder">
            <span className="play">▶</span>
            <p>YouTube Short</p>
            <small>Configura aquí el ID de tu vídeo oficial</small>
          </div>
        </div>
      </section>
    </>
  )
}

function About({ member }: { member: boolean }) {
  const rules = [
    "Respeto absoluto entre miembros",
    "Participación activa en eventos",
    "Seguir las instrucciones de R4 y R5",
    "No atacar alianzas aliadas",
    "Ayudar antes de pedir ayuda",
  ]
  return (
    <div className="content-page">
      <PageTitle eyebrow="Our blood-bound oath">About us</PageTitle>
      <div className="story-grid reveal">
        <div>
          <p className="lead">
            Bajo un mismo estandarte, frente a una misma oscuridad.
          </p>
          <p>
            Nacimos cuando el servidor era caos. Desde entonces, ANS se ha
            convertido en refugio para estrategas, guerreros y supervivientes
            leales.
          </p>
        </div>
        <div className="quote-card">
          “The plague tests the body.
          <br />
          Loyalty reveals the soul.”
        </div>
      </div>
      <section className="paper-section reveal">
        <p className="overline">The code we keep</p>
        <h2>Alliance rules</h2>
        <ol className="rules">
          {rules.map((r, i) => (
            <li key={r}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {r}
            </li>
          ))}
        </ol>
      </section>
      <section className="ranks reveal">
        <PageTitle eyebrow="The chain of command">Alliance ranks</PageTitle>
        {member ? (
          <div className="rank-tree">
            {[
              "R5 · Sovereign",
              "R4 · Council",
              "R3 · Vanguard",
              "R2 · Legion",
              "R1 · Initiate",
            ].map((r, i) => (
              <div key={r} className={`rank rank-${i}`}>
                <span>⚜</span>
                <strong>{r}</strong>
                <small>
                  {i === 0
                    ? "Leader of ANS"
                    : i === 1
                      ? "Strategy & command"
                      : "Alliance member"}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <Locked />
        )}
      </section>
    </div>
  )
}

function Constitution() {
  const articles = [
    [
      "I",
      "The Alliance",
      "ANS exists to unite active survivors under a code of loyalty, mutual aid and strategic strength.",
    ],
    [
      "II",
      "Conduct",
      "Respect is law. Harassment, discrimination and deliberate disruption have no place within our walls.",
    ],
    [
      "III",
      "War & Peace",
      "Members honor diplomatic agreements and never attack protected allies or resource tiles.",
    ],
    [
      "IV",
      "Participation",
      "Each survivor contributes according to their strength, with special focus on alliance events.",
    ],
    [
      "V",
      "Leadership",
      "R5 and the R4 council guide the alliance. Major decisions consider the good of all ANS.",
    ],
    [
      "VI",
      "Sanctions",
      "Warnings precede demotion or exile, except when an act threatens the entire alliance.",
    ],
  ]
  return (
    <div className="content-page">
      <PageTitle eyebrow="Law of server #233">
        Constitution of the server
      </PageTitle>
      <p className="page-lead reveal">
        Seis artículos sellados para preservar el orden entre las cenizas. Toca
        o posa el cursor sobre cada carta.
      </p>
      <div className="flip-grid reveal">
        {articles.map((a) => (
          <FlipCard
            key={a[0]}
            number={`ARTICLE ${a[0]}`}
            title={a[1]}
            text={a[2]}
          />
        ))}
      </div>
    </div>
  )
}

function Sanctuary() {
  const [open, setOpen] = useState(0)
  const levels = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <div className="content-page">
      <PageTitle eyebrow="Build beyond ruin">Sanctuary</PageTitle>
      <div className="level-summary reveal">
        <span>Current archive</span>
        <strong>30</strong>
        <p>sanctuary levels documented</p>
      </div>
      <div className="level-list reveal">
        {levels.map((level, i) => (
          <article
            className={`level-row ${open === i ? "open" : ""}`}
            key={level}
          >
            <button onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="level-number">
                {String(level).padStart(2, "0")}
              </span>
              <strong>Sanctuary level {level}</strong>
              <small>
                {level < 10
                  ? "Foundation"
                  : level < 20
                    ? "Fortification"
                    : "Ascension"}
              </small>
              <Icon name="chevron" />
            </button>
            <div className="level-detail">
              <div>
                <span>Food</span>
                <b>{(level * 1.35).toFixed(1)}M</b>
              </div>
              <div>
                <span>Iron</span>
                <b>{(level * 0.82).toFixed(1)}M</b>
              </div>
              <div>
                <span>Build time</span>
                <b>
                  {level + 2}h {level * 2}m
                </b>
              </div>
              <div>
                <span>Requirement</span>
                <b>Wall Lv. {Math.max(1, level - 1)}</b>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function Duel() {
  return (
    <div className="content-page">
      <PageTitle eyebrow="Six days · One victory">Alliance duel</PageTitle>
      <p className="page-lead reveal">
        Planifica cada recurso. Cada día revela una nueva forma de servir al
        estandarte.
      </p>
      <div className="flip-grid duel-grid reveal">
        {duelDays.map((d) => (
          <FlipCard
            key={d[0]}
            number={d[0].toUpperCase()}
            title={d[1]}
            text={d[2]}
            foot="Reset · 00:00 UTC"
          />
        ))}
      </div>
    </div>
  )
}

function Weapons() {
  return (
    <div className="content-page">
      <PageTitle eyebrow="The forge is burning">Weapons</PageTitle>
      <div className="coming-soon reveal">
        <div className="weapon-mark">⚔</div>
        <p>Archive under construction</p>
        <h2>Weapons are being forged</h2>
        <span>
          Los maestros armeros preparan esta sección. Regresa después de la
          próxima luna.
        </span>
        <div className="progress">
          <i />
        </div>
      </div>
    </div>
  )
}

function Guides() {
  const [guide, setGuide] = useState(0)
  const [slide, setSlide] = useState(0)
  const [zoom, setZoom] = useState(false)
  return (
    <div className="content-page">
      <PageTitle eyebrow="Wisdom survives">Field guides</PageTitle>
      <div className="guide-layout reveal">
        <aside className="guide-index">
          <p>Guide index</p>
          {guides.map((g, i) => (
            <button
              className={guide === i ? "active" : ""}
              onClick={() => {
                setGuide(i)
                setSlide(0)
              }}
              key={g}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {g}
            </button>
          ))}
        </aside>
        <article className="guide-article">
          <p className="overline">Guide {String(guide + 1).padStart(2, "0")}</p>
          <h2>{guides[guide]}</h2>
          <p className="lead">
            Todo lo que necesitas para dominar {guides[guide].toLowerCase()} sin
            desperdiciar recursos.
          </p>
          <h3>Antes de empezar</h3>
          <p>
            Revisa tus recursos, coordina con tus oficiales y sigue cada paso.
            Las mejores recompensas llegan cuando toda la alianza avanza unida.
          </p>
          <div className="phone-carousel">
            <button
              aria-label="Anterior"
              onClick={() => setSlide((slide + 2) % 3)}
            >
              ‹
            </button>
            <div
              className={`phone ${zoom ? "zoomed" : ""}`}
              onDoubleClick={() => setZoom(!zoom)}
            >
              <div className="phone__notch" />
              <div className="phone__screen">
                <small>LAST ASYLUM</small>
                <strong>{guides[guide]}</strong>
                <div className="mock-map">
                  <i />
                  <i />
                  <i />
                </div>
                <p>Paso {slide + 1} de 3</p>
              </div>
              <button
                className="zoom-button"
                aria-label="Ampliar"
                onClick={() => setZoom(!zoom)}
              >
                <Icon name="zoom" size={17} />
              </button>
            </div>
            <button
              aria-label="Siguiente"
              onClick={() => setSlide((slide + 1) % 3)}
            >
              ›
            </button>
          </div>
          <p className="caption">
            Captura {slide + 1} —{" "}
            {slide === 0
              ? "Abre el menú del evento"
              : slide === 1
                ? "Selecciona la misión marcada"
                : "Confirma y comparte con ANS"}
          </p>
        </article>
      </div>
    </div>
  )
}

function Tips({ member }: { member: boolean }) {
  const [tips, setTips] = useState<{ id: number text: string }[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ans-tips") || "[]")
    } catch {
      return []
    }
  })
  const [value, setValue] = useState("")
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    const next = [{ id: Date.now(), text: value.trim() }, ...tips]
    setTips(next)
    localStorage.setItem("ans-tips", JSON.stringify(next))
    setValue("")
  }
  if (!member)
    return (
      <div className="content-page">
        <PageTitle eyebrow="Knowledge is power">Share a tip</PageTitle>
        <Locked />
      </div>
    )
  return (
    <div className="content-page">
      <PageTitle eyebrow="Knowledge is power">Share a tip</PageTitle>
      <form className="tip-form reveal" onSubmit={submit}>
        <label htmlFor="tip">Escribe un consejo para tus aliados</label>
        <textarea
          id="tip"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Comparte una estrategia, recordatorio o descubrimiento…"
        />
        <button className="seal-button">
          Publish to the archive <Icon name="arrow" size={16} />
        </button>
      </form>
      <div className="tip-feed">
        {tips.length === 0 ? (
          <p className="empty">
            El pergamino está vacío. Sé el primero en compartir sabiduría.
          </p>
        ) : (
          tips.map((t) => (
            <article className="tip" key={t.id}>
              <span>ANS MEMBER</span>
              <p>{t.text}</p>
              <button
                onClick={() => {
                  const next = tips.filter((x) => x.id !== t.id)
                  setTips(next)
                  localStorage.setItem("ans-tips", JSON.stringify(next))
                }}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>(
    () => localStorage.getItem("ans-theme") as Theme || "gold",
  )
  const [role, setRoleState] = useState<Role>(
    () => localStorage.getItem("ans-role") as Role || "none",
  )
  const [page, setPage] = useState<Page>("home")
  const [menu, setMenu] = useState(false)
  const [ideas, setIdeas] = useState(false)
  const [guidesOpen, setGuidesOpen] = useState(false)

  const setRole = (r: Role) => {
    setRoleState(r)
    localStorage.setItem("ans-role", r)
  }
  const chooseTheme = (t: Theme) => {
    setTheme(t)
    localStorage.setItem("ans-theme", t)
  }
  const go = (p: Page) => {
    if (role === "none" && p !== "home") return
    setPage(p)
    setMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("revealed"),
        ),
      { threshold: 0.1 },
    )
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [page, role])

  const content = useMemo(() => {
    if (page === "home")
      return <Home role={role} setRole={setRole} setPage={go} />
    if (page === "about") return <About member={role === "member"} />
    if (page === "constitution") return <Constitution />
    if (page === "sanctuary") return <Sanctuary />
    if (page === "duel") return <Duel />
    if (page === "weapons") return <Weapons />
    if (page === "guides") return <Guides />
    return <Tips member={role === "member"} />
  }, [page, role])

  return (
    <div className={`app theme-${theme}`}>
      <div className="atmosphere" aria-hidden="true">
        <div className="fog fog-1" />
        <div className="fog fog-2" />
        <div className="embers">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="raven">⌁</div>
      </div>
      <button
        className="mobile-menu"
        onClick={() => setMenu(true)}
        aria-label="Abrir menú"
      >
        <Icon name="menu" size={22} />
      </button>
      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <button
          className="sidebar__close"
          onClick={() => setMenu(false)}
          aria-label="Cerrar menú"
        >
          <Icon name="close" />
        </button>
        <div
          className="brand"
          onClick={() => go("home")}
          role="button"
          tabIndex={0}
        >
          <Sigil compact />
          <div>
            <strong>ANS</strong>
            <span>Server #233</span>
          </div>
        </div>
        <div className="nav-label">The archive</div>
        <nav>
          {nav.map((item) => (
            <div key={item.id}>
              <button
                className={page === item.id ? "active" : ""}
                disabled={role === "none" && item.id !== "home"}
                onClick={() =>
                  item.id === "guides"
                    ? (setGuidesOpen(!guidesOpen), go("guides"))
                    : go(item.id)
                }
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.id === "guides" && <Icon name="chevron" size={15} />}
              </button>
              {item.id === "guides" && guidesOpen && role !== "none" && (
                <div className="subnav">
                  {guides.slice(0, 5).map((g) => (
                    <button key={g} onClick={() => go("guides")}>
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar__bottom">
          {role !== "none" && (
            <button className="identity" onClick={() => setRole("none")}>
              <span>⚜</span>
              <div>
                <b>{role === "member" ? "ANS Member" : "Guest"}</b>
                <small>End session</small>
              </div>
              <Icon name="logout" size={16} />
            </button>
          )}
          <p>Choose your realm</p>
          <div className="theme-picker">
            <button
              className={theme === "mono" ? "active" : ""}
              onClick={() => chooseTheme("mono")}
            >
              <i className="silver" />
              Monochrome
            </button>
            <button
              className={theme === "gold" ? "active" : ""}
              onClick={() => chooseTheme("gold")}
            >
              <i className="gold" />
              Gold
            </button>
          </div>
        </div>
      </aside>
      {menu && (
        <button
          className="backdrop"
          aria-label="Cerrar"
          onClick={() => setMenu(false)}
        />
      )}
      <main>
        {content}
        <footer>
          <Sigil compact />
          <p>ALLIANCE ANS · SERVER #233</p>
          <span>Made it with love: ur dear Ann♡</span>
        </footer>
      </main>
      <button className="idea-button" onClick={() => setIdeas(true)}>
        Any ideas?
      </button>
      {ideas && (
        <div
          className="modal-wrap"
          role="dialog"
          aria-modal="true"
          aria-labelledby="idea-title"
        >
          <button
            className="modal-backdrop"
            aria-label="Cerrar"
            onClick={() => setIdeas(false)}
          />
          <form
            className="modal"
            onSubmit={(e) => {
              e.preventDefault()
              setIdeas(false)
            }}
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setIdeas(false)}
            >
              <Icon name="close" />
            </button>
            <p className="overline">Whisper to the council</p>
            <h2 id="idea-title">Any ideas?</h2>
            <label htmlFor="idea">Tu sugerencia</label>
            <textarea
              id="idea"
              placeholder="¿Cómo podemos fortalecer ANS?"
              required
            />
            <button className="seal-button">Send by raven</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
