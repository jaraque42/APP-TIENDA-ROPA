export const PRODUCTS = [
  // RUNNING
  {
    id: 'aerdna-pro-elite',
    name: 'AERDNA PRO Elite',
    price: 180,
    image: '/images/products/aerdna-pro-elite.png',
    category: 'running',
    subCategory: 'calzado',
    featured: true,
    description: 'Diseñadas para la obsesión. Las AERDNA PRO Elite cuentan con una placa de carbono de propulsión máxima y nuestra espuma Aero-Foam+, entregando un retorno de energía sin precedentes. No corras. Vuela.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    specs: [
      { label: 'Peso', value: '210g (Talla 40)' },
      { label: 'Drop', value: '8mm' },
      { label: 'Superficie', value: 'Asfalto / Pista' }
    ]
  },
  {
    id: 'stealth-shield',
    name: 'Chaqueta Stealth Shield',
    price: 145,
    image: '/images/products/stealth-jacket.png',
    category: 'running',
    subCategory: 'textil',
    featured: false,
    description: 'Protección total sin compromisos. La Stealth Shield es 100% impermeable pero mantiene una transpirabilidad táctica extrema. Cortada para el movimiento, diseñada para el futuro.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Tejido', value: 'Gore-Tex AERDNA' },
      { label: 'Peso', value: '320g' },
      { label: 'Visibilidad', value: 'Reflectantes 360°' }
    ]
  },
  {
    id: 'core-ultralight',
    name: 'Camiseta Core Ultralight',
    price: 35,
    image: '/images/products/core-ultralight.png',
    category: 'running',
    subCategory: 'textil',
    featured: false,
    description: 'La ligereza redefinida. Fabricada con nuestro tejido exclusivo Micro-Aero, esta camiseta pesa menos que una pluma y se seca antes de que dejes de correr.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Tejido', value: 'Micro-Aero 90g' },
      { label: 'Ventilación', value: 'Laser-cut back' },
      { label: 'Secado', value: 'Instantáneo' }
    ]
  },
  {
    id: 'marathon-socks-pro',
    name: 'Calcetines Marathon Pro',
    price: 18,
    image: '/images/products/marathon-socks.png',
    category: 'running',
    subCategory: 'accesorios',
    featured: false,
    description: 'Cero ampollas. Ingeniería de compresión graduada y zonas de amortiguación anatómica para tus carreras más largas.',
    sizes: ['S', 'M', 'L'],
    specs: [
      { label: 'Compresión', value: 'Firme' },
      { label: 'Material', value: 'Coolmax 70%' },
      { label: 'Soporte', value: 'Arco plantar' }
    ]
  },
  {
    id: 'stride-shorts-5',
    name: 'Stride Shorts 5"',
    price: 35,
    image: '/images/products/stride-shorts.png',
    category: 'running',
    subCategory: 'textil',
    featured: false,
    description: 'Libertad de zancada. Corte ultra corto con forro interior de seda técnica para evitar rozaduras en distancias intensas.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Largo', value: '5 pulgadas' },
      { label: 'Bolsillo', value: 'Trasero seguro' },
      { label: 'Forro', value: 'Silk-Touch' }
    ]
  },
  {
    id: 'aerdna-windrunner-elite',
    name: 'AERDNA Windrunner Elite',
    price: 125,
    image: '/images/products/aerdna-windrunner.png',
    category: 'running',
    subCategory: 'textil',
    featured: false,
    description: 'Compite contra los elementos. Cortavientos translúcido ultraligero que bloquea el viento y la lluvia ligera sin añadir peso extra. Ajuste aerodinámico.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Peso', value: '85g' },
      { label: 'Visibilidad', value: 'Detalles reflectantes' },
      { label: 'Transpirabilidad', value: 'Alta' }
    ]
  },
  {
    id: 'aero-fit-tights',
    name: 'Aero-Fit Running Tights',
    price: 65,
    image: '/images/products/aero-fit-tights.png',
    category: 'running',
    subCategory: 'textil',
    featured: false,
    description: 'Mallas de compresión avanzadas para carreras de larga distancia. Tejido elástico en 4 direcciones que proporciona soporte muscular focalizado y reduce la fatiga.',
    sizes: ['S', 'M', 'L'],
    specs: [
      { label: 'Compresión', value: 'Graduada' },
      { label: 'Bolsillos', value: '2 laterales ocultos' },
      { label: 'Detalles', value: 'Costuras planas' }
    ]
  },

  // GYM / TRAINING
  {
    id: 'aerdna-compression',
    name: 'Top AERDNA Compresión',
    price: 45,
    image: '/images/products/aerdna-compression.png',
    category: 'gym',
    subCategory: 'textil',
    featured: false,
    description: 'Soporte muscular avanzado. La tecnología AERDNA Compresión reduce la fatiga y acelera la recuperación. Un ajuste de segunda piel que te permite empujar más fuerte.',
    sizes: ['XS', 'S', 'M', 'L'],
    specs: [
      { label: 'Material', value: 'Nylon reciclado 85%' },
      { label: 'Secado', value: 'Ultra-rápido' },
      { label: 'Costuras', value: 'Flat-lock anti-roce' }
    ]
  },
  {
    id: 'titan-lifting-shorts',
    name: 'Titan Lifting Shorts',
    price: 55,
    image: '/images/products/titan-shorts.png',
    category: 'gym',
    subCategory: 'textil',
    featured: false,
    description: 'Resistencia industrial. Los Titan Shorts están reforzados con fibras de Kevlar en los laterales para soportar el roce de las barras olímpicas sin perder movilidad.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Refuerzo', value: 'Kevlar T-Fiber' },
      { label: 'Largo', value: '7 pulgadas' },
      { label: 'Agarre', value: 'Silicone Waistband' }
    ]
  },
  {
    id: 'apex-training-hoodie',
    name: 'Sudadera Apex Training',
    price: 85,
    image: '/images/products/apex-hoodie.png',
    category: 'gym',
    subCategory: 'textil',
    featured: false,
    description: 'Calentamiento de élite. La Apex Hoodie regula la temperatura corporal durante el Warm-up, eliminando el sudor rápidamente y manteniendo el calor muscular.',
    sizes: ['M', 'L', 'XL'],
    specs: [
      { label: 'Tejido', value: 'Thermal AERDNA Fleece' },
      { label: 'Bolsillos', value: 'Tácticos invisibles' },
      { label: 'Cierre', value: 'YKK Snap-lock' }
    ]
  },
  {
    id: 'power-lifting-belt',
    name: 'Cinturón Power-Lift Pro',
    price: 75,
    image: '/images/products/power-lift-belt.png',
    category: 'gym',
    subCategory: 'accesorios',
    featured: false,
    description: 'Soporte para PRs. Cuero de alta resistencia con cierre de palanca metálica. Máxima estabilidad para tus sentadillas y pesos muertos.',
    sizes: ['M', 'L', 'XL'],
    specs: [
      { label: 'Cierre', value: 'Palanca de Acero' },
      { label: 'Grosor', value: '10mm' },
      { label: 'Certificación', value: 'IPF Spec' }
    ]
  },
  {
    id: 'sculpt-leggings-v1',
    name: 'Sculpt Leggings V1',
    price: 60,
    image: '/images/products/sculpt-leggings.png',
    category: 'gym',
    subCategory: 'textil',
    featured: false,
    description: 'Efecto moldeador total. Cintura extra alta que se mantiene en su sitio durante el yoga o el entrenamiento de fuerza más intenso.',
    sizes: ['XS', 'S', 'M', 'L'],
    specs: [
      { label: 'Cintura', value: 'High-Rise Sculpt' },
      { label: 'Tejido', value: 'Elastic Armor' },
      { label: 'Prueba', value: 'Squat Proof' }
    ]
  },
  {
    id: 'heavyweight-oversized-tee',
    name: 'Heavyweight Oversized Tee',
    price: 40,
    image: '/images/products/heavyweight-tee.png',
    category: 'gym',
    subCategory: 'textil',
    featured: false,
    description: 'Flow urbano para el gimnasio. Camiseta de algodón técnico con corte oversize. Tejido grueso pero transpirable, ideal para el entrenamiento de fuerza o el calentamiento.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    specs: [
      { label: 'Corte', value: 'Oversize Boxy Fit' },
      { label: 'Material', value: 'Algodón Heavyweight Tech' },
      { label: 'Cuello', value: 'Reforzado' }
    ]
  },
  {
    id: 'aerdna-tactical-duffle',
    name: 'AERDNA Tactical Duffle',
    price: 95,
    image: '/images/products/tactical-duffle.png',
    category: 'gym',
    subCategory: 'accesorios',
    featured: false,
    description: 'Tu taquilla portátil. Bolsa de deporte resistente con compartimentos separados para zapatillas, ropa húmeda y un organizador seguro para tus dispositivos de entrenamiento.',
    sizes: ['Única'],
    specs: [
      { label: 'Capacidad', value: '45L' },
      { label: 'Tejido', value: 'Cordura Resistente al Agua' },
      { label: 'Correas', value: 'Acolchadas multifunción' }
    ]
  },

  // FUTBOL
  {
    id: 'phantom-blade-fg',
    name: 'Phantom Blade FG',
    price: 240,
    image: '/images/products/phantom-blade.png',
    category: 'futbol',
    subCategory: 'calzado',
    featured: true,
    description: 'Control absoluto. La bota Phantom Blade utiliza nuestra superficie Grip-Skin en 3D para una fricción perfecta con el balón en cualquier condición climática.',
    sizes: ['39', '40', '41', '42', '43', '44'],
    specs: [
      { label: 'Suela', value: 'Placa Biónica de Carbono' },
      { label: 'Tacos', value: 'V-Blade (Terreno Firme)' },
      { label: 'Peso', value: '185g' }
    ]
  },
  {
    id: 'striker-pro-jersey',
    name: 'Jersey Striker PRO',
    price: 90,
    image: '/images/products/striker-pro-jersey.png',
    category: 'futbol',
    subCategory: 'textil',
    featured: false,
    description: 'La piel del campeón. Edición limitada de alta competición con paneles de ventilación mapeados por calor para un rendimiento máximo durante los 90 minutos.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Edición', value: 'Match Authentic' },
      { label: 'Tecnología', value: 'Heat-mapping Vents' },
      { label: 'Peso', value: '110g' }
    ]
  },
  {
    id: 'keeper-shield-gloves',
    name: 'Guantes Keeper Shield',
    price: 110,
    image: '/images/products/keeper-shield.png',
    category: 'futbol',
    subCategory: 'accesorios',
    featured: false,
    description: 'Imán para el balón. Los Keeper Shield cuentan con látex alemán de 4mm y varillas protectoras desmontables para máxima seguridad en los despejes.',
    sizes: ['8', '9', '10', '11'],
    specs: [
      { label: 'Látex', value: 'Gigagrip 4mm' },
      { label: 'Corte', value: 'Negative Cut' },
      { label: 'Protección', value: 'Pro-Spine Support' }
    ]
  },
  {
    id: 'league-match-ball',
    name: 'Balón AERDNA League',
    price: 65,
    image: '/images/products/league-ball.png',
    category: 'futbol',
    subCategory: 'accesorios',
    featured: false,
    description: 'Vuelo perfecto. Certificado por la liga para entrenamiento de alto nivel. Construcción de 32 paneles térmicamente sellados para una absorción de agua nula.',
    sizes: ['5'],
    specs: [
      { label: 'Certificación', value: 'Pro-Qualify' },
      { label: 'Paneles', value: 'Thermal Bonded' },
      { label: 'Cámara', value: 'Butilo de alta retención' }
    ]
  },

  // DROP EXCLUSIVO
  {
    id: 'aerdna-black-carbon',
    name: 'AERDNA Black Carbon V1',
    price: 320,
    image: '/images/products/black-carbon-v1.png',
    category: 'drop',
    subCategory: 'calzado',
    featured: true,
    description: 'La culminación de la ingeniería. Solo 500 unidades disponibles en todo el mundo. La edición "Black Carbon" presenta una suela de fibra de carbono aeroespacial y tejido autoregenerable.',
    sizes: ['40', '41', '42', '43', '44'],
    specs: [
      { label: 'Unidades', value: 'Limitado a 500' },
      { label: 'Material', value: 'Carbono Aeroespacial' },
      { label: 'Certificado', value: 'NFC Autenticidad' }
    ]
  },
  {
    id: 'stealth-liquid-vest',
    name: 'Chaleco Stealth Liquid-X',
    price: 215,
    image: '/images/products/liquid-x-vest.png',
    category: 'drop',
    subCategory: 'textil',
    featured: false,
    description: 'Termorregulación líquida avanzada. Este chaleco se adapta dinámicamente a tu temperatura corporal utilizando microcanales de refrigeración exclusivos.',
    sizes: ['M', 'L', 'XL'],
    specs: [
      { label: 'Tecnología', value: 'Liquid-X Cooling' },
      { label: 'Peso', value: '180g' },
      { label: 'Serie', value: 'Experiment-092' }
    ]
  },
  {
    id: 'cyber-bolt-hoodie',
    name: 'Sudadera Cyber-Bolt Limited',
    price: 190,
    image: '/images/products/cyber-bolt-hoodie.png',
    category: 'drop',
    subCategory: 'textil',
    featured: false,
    description: 'Estilo cyber-punk. Con detalles reflectantes que solo son visibles bajo luz UV. Una pieza de colección para los que viven el deporte por la noche.',
    sizes: ['S', 'M', 'L'],
    specs: [
      { label: 'Tejido', value: 'Heavyweight Tech Cotton' },
      { label: 'Detalles', value: 'UV-Reactive Print' },
      { label: 'Edición', value: 'Neon Pulse' }
    ]
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
