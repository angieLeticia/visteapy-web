export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: Size[];
  soldOutSizes?: Size[];
  image: string;
  reference?: string;
}

export interface Mode {
  slug: string;
  name: string;
  tagline: string;
  openingPoem: string;
  palette: string[];
  heroImage: string;
  heroImageAlt: string;
  products: Product[];
}

export const modes: Mode[] = [
  {
    slug: "magia-academica",
    name: "Modo Magia Académica",
    tagline: "El conocimiento tiene su propio uniforme.",
    openingPoem:
      "Hay salones que huelen a madera y pergamino. Hay atardeceres que solo existen entre estantes polvorientos. Aquí, el estilo no es vanidad — es identidad.",
    palette: ["#2D4A2D", "#8B7355", "#722F37", "#F5F0E8"],
    heroImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&fit=crop",
    heroImageAlt: "Biblioteca antigua con luz cálida de velas",
    products: [
      {
        id: "ma-001",
        name: "Look Biblioteca · Falda Plisada Oscura",
        description: "Falda midi plisada en verde bosque profundo, talle alto, caída perfecta.",
        price: 189000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80&fit=crop",
        reference: "Inspirada en los pasillos eternos de la academia de invierno",
      },
      {
        id: "ma-002",
        name: "Look Catedrático · Blazer Academia",
        description: "Blazer estructurado en tweed verde musgo con botones dorados discretos.",
        price: 265000,
        sizes: ["S", "M", "L", "XL"],
        soldOutSizes: ["XS"],
        image:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&fit=crop",
        reference: "Para las que llevan el conocimiento con elegancia",
      },
      {
        id: "ma-003",
        name: "Look Hechicera · Bufanda Tejida",
        description: "Bufanda gruesa en lana mezcla, franjas burdeos y dorado envejecido.",
        price: 95000,
        sizes: ["S", "M", "L", "XL"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80&fit=crop",
        reference: "El detalle que completa el look del atardecer en los corredores",
      },
      {
        id: "ma-004",
        name: "Look Prefecta · Blusa Oxford",
        description: "Blusa en algodón oxford blanco con cuello de lazo, botones nacarados.",
        price: 145000,
        sizes: ["XS", "S", "M"],
        soldOutSizes: ["XS"],
        image:
          "https://images.unsplash.com/photo-1485231183945-fffde7e0f09c?w=800&q=80&fit=crop",
        reference: "Impecable, siempre. Incluso bajo el manto de la niebla",
      },
      {
        id: "ma-005",
        name: "Look Runa · Sweater Cuello Alto",
        description: "Sweater en tejido suave borgoña, cuello alto vuelto, manga larga.",
        price: 175000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80&fit=crop",
        reference: "Cálido como los secretos que guarda el bosque en otoño",
      },
    ],
  },
  {
    slug: "regencia",
    name: "Modo Regencia",
    tagline: "La gracia nunca pasa de moda.",
    openingPoem:
      "Jardines en flor, cartas dobladas con esmero, miradas que dicen más que las palabras. La elegancia del pasado vive en cada costura.",
    palette: ["#C8A8C8", "#FFF8F0", "#F0B8C0", "#D4A843"],
    heroImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80&fit=crop",
    heroImageAlt: "Vestido romántico en jardín con luz dorada",
    products: [
      {
        id: "re-001",
        name: "Look Debutante · Vestido Imperio",
        description: "Vestido talle imperio en muselina lavanda empolvado, falda con vuelo suave.",
        price: 285000,
        sizes: ["XS", "S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&q=80&fit=crop",
        reference: "Para las veladas donde cada entrada es un debut",
      },
      {
        id: "re-002",
        name: "Look Condesa · Blusa con Bordados",
        description: "Blusa en seda crema con bordados florales en hilo dorado, escote V suave.",
        price: 195000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&fit=crop",
        reference: "Cada hilo, una historia bordada a mano en el tiempo",
      },
      {
        id: "re-003",
        name: "Look Jardín · Falda Larga con Vuelo",
        description: "Falda maxi en algodón rosa palo, vuelo amplio, cintura elástica discreta.",
        price: 165000,
        sizes: ["XS", "S", "M", "L", "XL"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&fit=crop",
        reference: "Perfecta para los paseos entre rosas que no tienen fin",
      },
      {
        id: "re-004",
        name: "Look Vizcondesa · Manga Abullonada",
        description: "Blusa con mangas abullonadas en organza blanco, cuello cerrado de lazo.",
        price: 175000,
        sizes: ["S", "M"],
        soldOutSizes: ["S"],
        image:
          "https://images.unsplash.com/photo-1551163943-3f7253a97843?w=800&q=80&fit=crop",
        reference: "Las mangas que la brisa lleva con ella en cada giro",
      },
      {
        id: "re-005",
        name: "Look Primera Danza · Vestido Romántico",
        description: "Vestido midi en chifón rosa palo con capa de tul, escote corazón.",
        price: 245000,
        sizes: ["XS", "S", "M"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=800&q=80&fit=crop",
        reference: "Para la primera danza que se recuerda toda la vida",
      },
    ],
  },
  {
    slug: "riviera",
    name: "Modo Riviera",
    tagline: "El verano que no termina.",
    openingPoem:
      "Sal en el cabello, luz mediterránea en la piel, un libro abandonado en la arena. El verano es un estado mental que dura todo el año.",
    palette: ["#F5F0E8", "#2B5F8E", "#C4603A", "#D4A843"],
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&fit=crop",
    heroImageAlt: "Costa mediterránea con luz dorada de verano",
    products: [
      {
        id: "ri-001",
        name: "Look Terraza · Blusa de Lino",
        description: "Blusa suelta en lino blanco roto, mangas anchas, botones de nácar.",
        price: 145000,
        sizes: ["XS", "S", "M", "L", "XL"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&fit=crop",
        reference: "Para los almuerzos que se convierten en atardeceres sin que te des cuenta",
      },
      {
        id: "ri-002",
        name: "Look Ciclista · Shorts Talle Alto",
        description: "Shorts de talle alto en algodón azul mediterráneo, corte limpio.",
        price: 119000,
        sizes: ["XS", "S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&fit=crop",
        reference: "Los que llevas cuando descubres un pueblo nuevo cada mañana",
      },
      {
        id: "ri-003",
        name: "Look Brisa · Vestido Midi Suelto",
        description: "Vestido midi en lino terracota, corte relajado, abertura lateral sutil.",
        price: 215000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&fit=crop",
        reference: "El color del sol que se pone sobre el agua",
      },
      {
        id: "ri-004",
        name: "Look Pesca · Set Lino Crudo",
        description: "Conjunto de pantalón ancho y top sin mangas en lino crudo natural.",
        price: 265000,
        sizes: ["XS", "S", "M"],
        soldOutSizes: ["XS"],
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&fit=crop",
        reference: "Para las mañanas que empiezan con café y terminan en el mar",
      },
      {
        id: "ri-005",
        name: "Look Postcard · Falda Estampada",
        description: "Falda midi con estampado mediterráneo en azul y blanco, talle elástico.",
        price: 155000,
        sizes: ["S", "M", "L", "XL"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1434232006078-a4fa4bc0a3b6?w=800&q=80&fit=crop",
        reference: "La postal que te mandas a ti misma desde el futuro",
      },
    ],
  },
  {
    slug: "sastre",
    name: "Modo Sastre",
    tagline: "La estrategia también es estilo.",
    openingPoem:
      "Hay tableros de ajedrez que no están en un tablero. El movimiento correcto, la postura exacta, el traje que dice todo sin decir nada.",
    palette: ["#C49A6C", "#F5F5F0", "#0F0F0F", "#C8A52B"],
    heroImage:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&q=80&fit=crop",
    heroImageAlt: "Look editorial de sastrería femenina en los años 60",
    products: [
      {
        id: "sa-001",
        name: "Look Gambito · Vestido Shift",
        description: "Vestido shift sin mangas en camel estructurado, corte geométrico limpio.",
        price: 235000,
        sizes: ["XS", "S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop",
        reference: "Cada movimiento calculado, cada prenda un argumento",
      },
      {
        id: "sa-002",
        name: "Look Apertura · Abrigo Camel",
        description: "Abrigo largo en paño camel, solapa ancha, cinturón a tono.",
        price: 295000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1548624313-0396a39b47fa?w=800&q=80&fit=crop",
        reference: "El clásico que nunca falla porque fue diseñado para ganar",
      },
      {
        id: "sa-003",
        name: "Look Jaque · Blusa Geométrica",
        description: "Blusa en seda blanca con estampado geométrico negro, cuello cerrado.",
        price: 165000,
        sizes: ["XS", "S", "M"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&fit=crop",
        reference: "El patrón que revela la estrategia antes de que sea tarde",
      },
      {
        id: "sa-004",
        name: "Look Torre · Pantalón Sastre",
        description: "Pantalón recto de talle alto en mostaza, bolsillos funcionales.",
        price: 189000,
        sizes: ["XS", "S", "M", "L"],
        soldOutSizes: ["XS"],
        image:
          "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&q=80&fit=crop",
        reference: "Erguida. Siempre hacia adelante. Siempre firme.",
      },
      {
        id: "sa-005",
        name: "Look Reina · Blazer Blanco",
        description: "Blazer estructurado blanco hueso, una sola botonadura dorada, fit slim.",
        price: 255000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&fit=crop",
        reference: "La pieza que cierra cualquier argumento",
      },
    ],
  },
  {
    slug: "romantica-oscura",
    name: "Modo Romántica Oscura",
    tagline: "El amor más profundo vive en las sombras.",
    openingPoem:
      "Niebla en los páramos. Un corazón que late más fuerte cuando llueve. La oscuridad no asusta — es donde las historias más intensas comienzan.",
    palette: ["#7D7D8C", "#6B2737", "#0F0F0F", "#B8ADCC"],
    heroImage:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1600&q=80&fit=crop",
    heroImageAlt: "Paisaje oscuro etéreo con neblina y árboles",
    products: [
      {
        id: "ro-001",
        name: "Look Páramo · Vestido con Encaje",
        description: "Vestido largo negro con detalles de encaje en el escote y mangas.",
        price: 245000,
        sizes: ["XS", "S", "M"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop",
        reference: "Para las que prefieren el atardecer a cualquier amanecer",
      },
      {
        id: "ro-002",
        name: "Look Niebla · Abrigo Largo",
        description: "Abrigo largo en paño gris piedra oscuro, cuello alto, corte dramático.",
        price: 285000,
        sizes: ["S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1548624313-0396a39b47fa?w=800&q=80&fit=crop",
        reference: "La capa que te vuelve protagonista de tu propio thriller",
      },
      {
        id: "ro-003",
        name: "Look Vino · Blusa con Capas",
        description: "Blusa en vino oscuro con capas de gasa translúcida, manga acampanada.",
        price: 165000,
        sizes: ["XS", "S", "M", "L"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1485231183945-fffde7e0f09c?w=800&q=80&fit=crop",
        reference: "El color de las rosas que nadie le regaló a nadie",
      },
      {
        id: "ro-004",
        name: "Look Eclipse · Botas Altas",
        description: "Botas sobre la rodilla en cuero negro, tacón bajo, cierre lateral.",
        price: 295000,
        sizes: ["35", "36", "37", "38", "39"] as unknown as Size[],
        soldOutSizes: ["37"] as unknown as Size[],
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&fit=crop",
        reference: "Cada paso, un poema oscuro escrito en el suelo",
      },
      {
        id: "ro-005",
        name: "Look Lavanda · Vestido Midi Etéreo",
        description: "Vestido midi en chifón lavanda gris, cuerpo ajustado, falda fluida.",
        price: 215000,
        sizes: ["XS", "S", "M"],
        soldOutSizes: [],
        image:
          "https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=800&q=80&fit=crop",
        reference: "La contradicción perfecta: suave por fuera, intensa por dentro",
      },
    ],
  },
];

export function getModeBySlug(slug: string): Mode | undefined {
  return modes.find((m) => m.slug === slug);
}

export function formatPrice(price: number): string {
  return `$ ${price.toLocaleString("es-CO")} COP`;
}
