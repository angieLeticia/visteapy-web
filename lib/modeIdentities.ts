export interface ModeIdentity {
  accent: string;
  descriptor: string;
  question: string;
  number: string;
}

export const modeIdentities: Record<string, ModeIdentity> = {
  "magia-academica": {
    accent: "#2D4A22",
    descriptor: "Curiosa. Profunda. Atemporal.",
    question: "¿Qué versión de ti vive entre páginas y pergaminos?",
    number: "01",
  },
  regencia: {
    accent: "#1B3A5C",
    descriptor: "Dramática. Exquisita. Irresistible.",
    question: "¿Cuándo fue la última vez que entraste a un cuarto y lo cambiaste todo?",
    number: "02",
  },
  riviera: {
    accent: "#4A7FA5",
    descriptor: "Luminosa. Libre. Mediterránea.",
    question: "¿Cuándo fue la última vez que el sol te dio en la cara sin pedir permiso?",
    number: "03",
  },
  sastre: {
    accent: "#2A2A2A",
    descriptor: "Precisa. Poderosa. Sin excusas.",
    question: "¿Qué versión de ti no pide permiso para ocupar espacio?",
    number: "04",
  },
  "romantica-oscura": {
    accent: "#4A1528",
    descriptor: "Intensa. Misteriosa. Verdadera.",
    question: "¿Qué tan profundo puede ir tu estilo?",
    number: "05",
  },
  "francesa-casual": {
    accent: "#C4A882",
    descriptor: "Fácil. Espontánea. Siempre lista.",
    question: "¿Y si hoy no tienes que intentarlo tanto?",
    number: "06",
  },
  "noche-terciopelo": {
    accent: "#080808",
    descriptor: "Nocturna. Magnética. Inevitable.",
    question: "¿Quién eres cuando la noche te da permiso de ser tú misma?",
    number: "07",
  },
};
