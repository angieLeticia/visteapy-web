-- =============================================
-- VISTEAPY — Schema + Seed
-- Pega este archivo completo en:
-- Supabase → SQL Editor → New query → Run
-- =============================================

-- Tabla de modos
create table if not exists modes (
  slug          text primary key,
  name          text not null,
  tagline       text not null,
  opening_poem  text not null,
  palette       text[] not null default '{}',
  hero_image    text not null,
  hero_image_alt text not null,
  sort_order    int not null default 0
);

-- Tabla de productos
create table if not exists products (
  id             text primary key,
  mode_slug      text not null references modes(slug) on delete cascade,
  name           text not null,
  description    text not null,
  price          int not null,
  sizes          text[] not null default '{}',
  sold_out_sizes text[] not null default '{}',
  image          text not null,
  reference      text,
  sort_order     int not null default 0
);

-- Índice para consultas por modo
create index if not exists products_mode_slug_idx on products(mode_slug);

-- RLS: lectura pública (solo lectura, sin autenticación)
alter table modes    enable row level security;
alter table products enable row level security;

create policy "Public read modes"    on modes    for select using (true);
create policy "Public read products" on products for select using (true);


-- =============================================
-- SEED — Modos
-- =============================================

insert into modes (slug, name, tagline, opening_poem, palette, hero_image, hero_image_alt, sort_order) values
(
  'magia-academica',
  'Modo Magia Académica',
  'El conocimiento tiene su propio uniforme.',
  'Hay salones que huelen a madera y pergamino. Hay atardeceres que solo existen entre estantes polvorientos. Aquí, el estilo no es vanidad — es identidad.',
  array['#2D4A2D','#8B7355','#722F37','#F5F0E8'],
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&fit=crop',
  'Biblioteca antigua con luz cálida de velas',
  1
),
(
  'regencia',
  'Modo Regencia',
  'La gracia nunca pasa de moda.',
  'Jardines en flor, cartas dobladas con esmero, miradas que dicen más que las palabras. La elegancia del pasado vive en cada costura.',
  array['#C8A8C8','#FFF8F0','#F0B8C0','#D4A843'],
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80&fit=crop',
  'Vestido romántico en jardín con luz dorada',
  2
),
(
  'riviera',
  'Modo Riviera',
  'El verano que no termina.',
  'Sal en el cabello, luz mediterránea en la piel, un libro abandonado en la arena. El verano es un estado mental que dura todo el año.',
  array['#F5F0E8','#2B5F8E','#C4603A','#D4A843'],
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&fit=crop',
  'Costa mediterránea con luz dorada de verano',
  3
),
(
  'sastre',
  'Modo Sastre',
  'La estrategia también es estilo.',
  'Hay tableros de ajedrez que no están en un tablero. El movimiento correcto, la postura exacta, el traje que dice todo sin decir nada.',
  array['#C49A6C','#F5F5F0','#0F0F0F','#C8A52B'],
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&q=80&fit=crop',
  'Look editorial de sastrería femenina en los años 60',
  4
),
(
  'romantica-oscura',
  'Modo Romántica Oscura',
  'El amor más profundo vive en las sombras.',
  'Niebla en los páramos. Un corazón que late más fuerte cuando llueve. La oscuridad no asusta — es donde las historias más intensas comienzan.',
  array['#7D7D8C','#6B2737','#0F0F0F','#B8ADCC'],
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1600&q=80&fit=crop',
  'Paisaje oscuro etéreo con neblina y árboles',
  5
)
on conflict (slug) do nothing;


-- =============================================
-- SEED — Productos: Magia Académica
-- =============================================

insert into products (id, mode_slug, name, description, price, sizes, sold_out_sizes, image, reference, sort_order) values
('ma-001','magia-academica','Look Biblioteca · Falda Plisada Oscura','Falda midi plisada en verde bosque profundo, talle alto, caída perfecta.',189000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80&fit=crop','Inspirada en los pasillos eternos de la academia de invierno',1),
('ma-002','magia-academica','Look Catedrático · Blazer Academia','Blazer estructurado en tweed verde musgo con botones dorados discretos.',265000,array['S','M','L','XL'],array['XS'],'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&fit=crop','Para las que llevan el conocimiento con elegancia',2),
('ma-003','magia-academica','Look Hechicera · Bufanda Tejida','Bufanda gruesa en lana mezcla, franjas burdeos y dorado envejecido.',95000,array['S','M','L','XL'],array[]::text[],'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80&fit=crop','El detalle que completa el look del atardecer en los corredores',3),
('ma-004','magia-academica','Look Prefecta · Blusa Oxford','Blusa en algodón oxford blanco con cuello de lazo, botones nacarados.',145000,array['XS','S','M'],array['XS'],'https://images.unsplash.com/photo-1485231183945-fffde7e0f09c?w=800&q=80&fit=crop','Impecable, siempre. Incluso bajo el manto de la niebla',4),
('ma-005','magia-academica','Look Runa · Sweater Cuello Alto','Sweater en tejido suave borgoña, cuello alto vuelto, manga larga.',175000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80&fit=crop','Cálido como los secretos que guarda el bosque en otoño',5)
on conflict (id) do nothing;


-- =============================================
-- SEED — Productos: Regencia
-- =============================================

insert into products (id, mode_slug, name, description, price, sizes, sold_out_sizes, image, reference, sort_order) values
('re-001','regencia','Look Debutante · Vestido Imperio','Vestido talle imperio en muselina lavanda empolvado, falda con vuelo suave.',285000,array['XS','S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&q=80&fit=crop','Para las veladas donde cada entrada es un debut',1),
('re-002','regencia','Look Condesa · Blusa con Bordados','Blusa en seda crema con bordados florales en hilo dorado, escote V suave.',195000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&fit=crop','Cada hilo, una historia bordada a mano en el tiempo',2),
('re-003','regencia','Look Jardín · Falda Larga con Vuelo','Falda maxi en algodón rosa palo, vuelo amplio, cintura elástica discreta.',165000,array['XS','S','M','L','XL'],array[]::text[],'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&fit=crop','Perfecta para los paseos entre rosas que no tienen fin',3),
('re-004','regencia','Look Vizcondesa · Manga Abullonada','Blusa con mangas abullonadas en organza blanco, cuello cerrado de lazo.',175000,array['S','M'],array['S'],'https://images.unsplash.com/photo-1551163943-3f7253a97843?w=800&q=80&fit=crop','Las mangas que la brisa lleva con ella en cada giro',4),
('re-005','regencia','Look Primera Danza · Vestido Romántico','Vestido midi en chifón rosa palo con capa de tul, escote corazón.',245000,array['XS','S','M'],array[]::text[],'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=800&q=80&fit=crop','Para la primera danza que se recuerda toda la vida',5)
on conflict (id) do nothing;


-- =============================================
-- SEED — Productos: Riviera
-- =============================================

insert into products (id, mode_slug, name, description, price, sizes, sold_out_sizes, image, reference, sort_order) values
('ri-001','riviera','Look Terraza · Blusa de Lino','Blusa suelta en lino blanco roto, mangas anchas, botones de nácar.',145000,array['XS','S','M','L','XL'],array[]::text[],'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&fit=crop','Para los almuerzos que se convierten en atardeceres sin que te des cuenta',1),
('ri-002','riviera','Look Ciclista · Shorts Talle Alto','Shorts de talle alto en algodón azul mediterráneo, corte limpio.',119000,array['XS','S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&fit=crop','Los que llevas cuando descubres un pueblo nuevo cada mañana',2),
('ri-003','riviera','Look Brisa · Vestido Midi Suelto','Vestido midi en lino terracota, corte relajado, abertura lateral sutil.',215000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&fit=crop','El color del sol que se pone sobre el agua',3),
('ri-004','riviera','Look Pesca · Set Lino Crudo','Conjunto de pantalón ancho y top sin mangas en lino crudo natural.',265000,array['XS','S','M'],array['XS'],'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&fit=crop','Para las mañanas que empiezan con café y terminan en el mar',4),
('ri-005','riviera','Look Postcard · Falda Estampada','Falda midi con estampado mediterráneo en azul y blanco, talle elástico.',155000,array['S','M','L','XL'],array[]::text[],'https://images.unsplash.com/photo-1434232006078-a4fa4bc0a3b6?w=800&q=80&fit=crop','La postal que te mandas a ti misma desde el futuro',5)
on conflict (id) do nothing;


-- =============================================
-- SEED — Productos: Sastre
-- =============================================

insert into products (id, mode_slug, name, description, price, sizes, sold_out_sizes, image, reference, sort_order) values
('sa-001','sastre','Look Gambito · Vestido Shift','Vestido shift sin mangas en camel estructurado, corte geométrico limpio.',235000,array['XS','S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop','Cada movimiento calculado, cada prenda un argumento',1),
('sa-002','sastre','Look Apertura · Abrigo Camel','Abrigo largo en paño camel, solapa ancha, cinturón a tono.',295000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1548624313-0396a39b47fa?w=800&q=80&fit=crop','El clásico que nunca falla porque fue diseñado para ganar',2),
('sa-003','sastre','Look Jaque · Blusa Geométrica','Blusa en seda blanca con estampado geométrico negro, cuello cerrado.',165000,array['XS','S','M'],array[]::text[],'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&fit=crop','El patrón que revela la estrategia antes de que sea tarde',3),
('sa-004','sastre','Look Torre · Pantalón Sastre','Pantalón recto de talle alto en mostaza, bolsillos funcionales.',189000,array['XS','S','M','L'],array['XS'],'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&q=80&fit=crop','Erguida. Siempre hacia adelante. Siempre firme.',4),
('sa-005','sastre','Look Reina · Blazer Blanco','Blazer estructurado blanco hueso, una sola botonadura dorada, fit slim.',255000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&fit=crop','La pieza que cierra cualquier argumento',5)
on conflict (id) do nothing;


-- =============================================
-- SEED — Productos: Romántica Oscura
-- =============================================

insert into products (id, mode_slug, name, description, price, sizes, sold_out_sizes, image, reference, sort_order) values
('ro-001','romantica-oscura','Look Páramo · Vestido con Encaje','Vestido largo negro con detalles de encaje en el escote y mangas.',245000,array['XS','S','M'],array[]::text[],'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop','Para las que prefieren el atardecer a cualquier amanecer',1),
('ro-002','romantica-oscura','Look Niebla · Abrigo Largo','Abrigo largo en paño gris piedra oscuro, cuello alto, corte dramático.',285000,array['S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1548624313-0396a39b47fa?w=800&q=80&fit=crop','La capa que te vuelve protagonista de tu propio thriller',2),
('ro-003','romantica-oscura','Look Vino · Blusa con Capas','Blusa en vino oscuro con capas de gasa translúcida, manga acampanada.',165000,array['XS','S','M','L'],array[]::text[],'https://images.unsplash.com/photo-1485231183945-fffde7e0f09c?w=800&q=80&fit=crop','El color de las rosas que nadie le regaló a nadie',3),
('ro-004','romantica-oscura','Look Eclipse · Botas Altas','Botas sobre la rodilla en cuero negro, tacón bajo, cierre lateral.',295000,array['35','36','37','38','39'],array['37'],'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&fit=crop','Cada paso, un poema oscuro escrito en el suelo',4),
('ro-005','romantica-oscura','Look Lavanda · Vestido Midi Etéreo','Vestido midi en chifón lavanda gris, cuerpo ajustado, falda fluida.',215000,array['XS','S','M'],array[]::text[],'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=800&q=80&fit=crop','La contradicción perfecta: suave por fuera, intensa por dentro',5)
on conflict (id) do nothing;
