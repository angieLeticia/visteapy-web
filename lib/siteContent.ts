export const siteContent = {
  nav: {
    modos: "Universos",
    manifesto: "Manifiesto",
    contacto: "Contacto",
    cta: "Explorar →",
  },

  hero: {
    location: "Bogotá · Colombia",
    headline_line1: "La ropa de",
    headline_line2: "las protagonistas.",
    subheadline: "Para las que lo son.",
    cta_primary: "Ver los looks →",
    cta_secondary: "Nuestra historia",
    strip_label: "↓ Elige tu universo",
    count_label: (modesCount: number, looksCount: number): string =>
      `${modesCount} universos · ${looksCount} looks`,
  },

  favorites: {
    eyebrow: "Mis Favoritos",
    tab_new: "NEW IN",
    tab_bestseller: "LO MÁS VENDIDO",
    tab_sale: "REBAJAS",
    badge_sale: "REBAJA",
    cta: "Ver toda la colección →",
  },

  modes: {
    section_eyebrow: "Los universos",
    section_headline: "¿Cuál eres\nhoy?",
    section_subheadline:
      "Cada modo es una versión de ti. Algunas las conoces. Otras, todavía no.",
  },

  howItWorks: {
    eyebrow: "El proceso",
    headline: "Tan fácil como elegir tu escena",
    steps: [
      {
        number: "01",
        title: "Elige tu look",
        description:
          "Explora los universos hasta que uno te hable. No lo pienses demasiado — lo vas a saber.",
      },
      {
        number: "02",
        title: "Nos escribes",
        description:
          "Un mensaje por WhatsApp es todo. Respondemos en menos de dos horas — personas reales, no bots.",
      },
      {
        number: "03",
        title: "Te conviertes",
        description:
          "Tu look llega y la escena empieza. Lo que pasa después ya depende de ti.",
      },
    ],
  },

  manifesto: {
    eyebrow: "Manifiesto",
    quote_line1: "No te vistes.",
    quote_line2: "Te conviertes.",
    body: "La ropa es el primer capítulo de tu historia.\nCada outfit es una decisión sobre quién eres hoy.",
    cta: "Leer el manifiesto completo →",
  },

  manifestoPage: {
    eyebrow: "Manifiesto",
    headline: "No te vistes.\nTe conviertes.",
    body: [
      "Hubo una escena que te cambió. Una protagonista que llevaba algo que no podías describir con palabras pero que sentías como tuyo. No era la ropa. Era lo que la ropa decía sin hablar. Ese momento — ese reconocimiento instantáneo de algo que todavía no sabías que eras — es exactamente por qué existe Visteapy.",
      "Creemos que hay personajes que nos resuenan no porque queramos ser ellos, sino porque ya somos algo de ellos. Que la ropa es el puente más corto entre quién eres y quién sabes que puedes ser. Que ese puente no tiene que costar una fortuna ni requerir un estilista. Solo requiere saber qué universo es tuyo.",
      "Cada modo es un mundo completo. Tiene su propia luz, su propio ritmo, sus propios silencios. No armamos outfits sueltos — armamos escenas enteras. Cuando entras a Modo Sastre no estás comprando un blazer, estás eligiendo cómo vas a pararte en una habitación. Cuando entras a Modo Riviera no estás comprando lino, estás comprando la versión de ti que no revisa el correo en vacaciones.",
      "No estamos en el negocio de las tendencias rápidas. Estamos en el negocio de los momentos que se recuerdan: la primera vez que entraste a algún lugar y sentiste que todas las miradas se detuvieron. La foto que guardas como favorita. El día que te pusiste algo y pensaste, con total claridad: hoy sí soy yo.",
      "Somos colombianas. Sabemos que la elegancia no tiene que ser cara para ser verdadera. Sabemos que el estilo es accesible si alguien te ayuda a encontrar el tuyo. Y sabemos que las mejores colecciones no las hace el precio — las hace la coherencia, el criterio, la intención detrás de cada pieza.",
      "Visteapy es esa amiga con criterio impecable que te dice la verdad: lo que te queda bien, lo que no vale la pena, lo que te va a hacer sentir exactamente como quieres sentirte. Sin filtros. Sin ventas vacías. Con toda la honestidad y todo el cariño del mundo.",
      "La película empieza cuando te la pones.",
    ],
  },

  whatsapp: {
    general:
      "Hola Visteapy ✨ Quiero conocer más sobre sus universos y encontrar mi look. ¿Por dónde empezamos?",
    byMode: {
      "magia-academica":
        "Hola Visteapy, estoy explorando el Modo Magia Académica y hay algo que me habló. ¿Pueden contarme más sobre las piezas disponibles?",
      regencia:
        "Hola Visteapy, el Modo Regencia me tiene completamente enamorada. Quiero saber qué tienen disponible y cómo funciona el proceso.",
      riviera:
        "Hola Visteapy 🌊 El Modo Riviera es exactamente lo que estaba buscando. ¿Qué tallas tienen disponibles en este momento?",
      sastre:
        "Hola Visteapy, el Modo Sastre me interesa mucho. Busco piezas estructuradas con presencia real. ¿Podemos hablar de las opciones?",
      "romantica-oscura":
        "Hola Visteapy, el Modo Romántica Oscura me representa completamente. Quiero saber más sobre las piezas y las tallas disponibles.",
      "francesa-casual":
        "Hola Visteapy, el Modo Francesa Casual tiene exactamente lo que necesito para el día a día. ¿Qué me recomiendan para empezar?",
      "noche-terciopelo":
        "Hola Visteapy 🖤 Modo Noche de Terciopelo — necesito algo para una noche especial. ¿Qué tienen disponible?",
    } as Record<string, string>,
  },

  contact: {
    eyebrow: "Contacto",
    headline: "Hablemos",
    subheadline:
      "La forma más directa de encontrar tu look es escribirnos. Respondemos todos los mensajes, siempre.",
    whatsapp_label: "WhatsApp",
    whatsapp_cta: "Escríbenos — respondemos en menos de 2h",
    instagram_label: "Instagram",
    instagram_handle: "@visteapy",
    tiktok_label: "TikTok",
    tiktok_handle: "@visteapy",
    email_label: "Email",
    email_address: "hola@visteapy.com",
  },

  footer: {
    tagline: "La película empieza cuando te la pones.",
    nav: {
      modos: "Universos",
      manifesto: "Manifiesto",
      contacto: "Contacto",
    },
    copyright: "© 2026 Visteapy · Bogotá, Colombia",
    made_in: "Para las que viven como protagonistas.",
  },

  modePages: {
    "magia-academica": {
      descriptor: "Saber. Ritual. Bosque.",
      question: "¿Qué llevas puesto cuando descubres algo que cambia todo?",
      cta_reserve: "Quiero esta pieza →",
      continue_label: "Seguir explorando →",
    },
    regencia: {
      descriptor: "Gracia. Jardín. Tiempo.",
      question: "¿Qué te pondrías si supieras que alguien importante va a verte?",
      cta_reserve: "Hacer esta mía →",
      continue_label: "Continúa la función →",
    },
    riviera: {
      descriptor: "Sol. Sal. Libertad.",
      question: "¿Cuándo fue la última vez que no miraste el teléfono por horas?",
      cta_reserve: "Me la llevo →",
      continue_label: "Descubre otro universo →",
    },
    sastre: {
      descriptor: "Estructura. Poder. Silencio.",
      question: "¿Qué llevas cuando quieres que te tomen en serio antes de hablar?",
      cta_reserve: "Agregar a mi armadura →",
      continue_label: "Explorar otro modo →",
    },
    "romantica-oscura": {
      descriptor: "Niebla. Intensidad. Secreto.",
      question: "¿Qué llevas cuando amas con más fuerza de la que deberías?",
      cta_reserve: "Esta pieza es mía →",
      continue_label: "Continúa la función →",
    },
    "francesa-casual": {
      descriptor: "Effortless. Café. Mañana.",
      question: "¿Y si hoy no tienes que intentarlo tanto?",
      cta_reserve: "La quiero para mí →",
      continue_label: "Ver otro universo →",
    },
    "noche-terciopelo": {
      descriptor: "Noche. Presencia. Memoria.",
      question: "¿Quién eres cuando la noche te da permiso de ser tú misma?",
      cta_reserve: "Reservar para la noche →",
      continue_label: "Explorar de día también →",
    },
  } as Record<
    string,
    {
      descriptor: string;
      question: string;
      cta_reserve: string;
      continue_label: string;
    }
  >,
} as const;
