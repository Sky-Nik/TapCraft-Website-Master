import type {
  Shape,
  Material,
  NFCChip,
  Finish,
  FontOption,
  TextEffect,
} from '@/types/customization';

export const SHAPES: Shape[] = [
  {
    id: 'business-card',
    name: 'Business Card',
    description: 'Standard credit card size (85.6 x 53.98 mm)',
    defaultDimensions: { width: 86, height: 54, unit: 'mm' },
    sizeModifier: 1.0,
  },
  {
    id: 'round-tag',
    name: 'Round Tag',
    description: 'Compact circular tag (40 mm diameter)',
    defaultDimensions: { width: 40, height: 40, unit: 'mm' },
    sizeModifier: 0.7,
  },
  {
    id: 'square-tag',
    name: 'Square Tag',
    description: 'Versatile square tag (50 x 50 mm)',
    defaultDimensions: { width: 50, height: 50, unit: 'mm' },
    sizeModifier: 0.8,
  },
  {
    id: 'custom-rectangle',
    name: 'Custom Rectangle',
    description: 'Flexible rectangular format for custom sizing',
    defaultDimensions: { width: 70, height: 45, unit: 'mm' },
    sizeModifier: 0.9,
  },
  {
    id: 'keychain',
    name: 'Keychain',
    description: 'Compact keychain-friendly shape with hole (35 x 50 mm)',
    defaultDimensions: { width: 35, height: 50, unit: 'mm' },
    sizeModifier: 0.75,
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'ID badge format with lanyard slot (54 x 85 mm)',
    defaultDimensions: { width: 54, height: 85, unit: 'mm' },
    sizeModifier: 1.1,
  },
];

export const MATERIALS: Material[] = [
  {
    id: 'pla',
    name: 'PLA',
    description:
      'Standard biodegradable thermoplastic. Smooth finish with good detail.',
    priceModifier: 1.0,
    colors: ['#000000', '#ffffff', '#1E73FF', '#1a73e8', '#e53935', '#43a047'],
    durability: 'standard',
  },
  {
    id: 'petg',
    name: 'PETG',
    description:
      'Stronger and more flexible than PLA. Excellent chemical resistance.',
    priceModifier: 1.25,
    colors: ['#000000', '#ffffff', '#1E73FF', '#0d47a1', '#b71c1c', '#1b5e20'],
    durability: 'high',
  },
  {
    id: 'resin',
    name: 'Resin',
    description:
      'Ultra-smooth surface with incredible detail. Best for premium products.',
    priceModifier: 1.8,
    colors: ['#000000', '#ffffff', '#2c2c2c', '#f5f5dc'],
    durability: 'premium',
  },
  {
    id: 'wood-filled-pla',
    name: 'Wood-filled PLA',
    description:
      'PLA infused with real wood fibers for a natural look and feel.',
    priceModifier: 1.5,
    colors: ['#8b6914', '#a0522d', '#6b3a2a', '#deb887'],
    durability: 'standard',
  },
  {
    id: 'carbon-fiber-pla',
    name: 'Carbon Fiber PLA',
    description:
      'PLA reinforced with carbon fiber for a premium, high-tech aesthetic.',
    priceModifier: 2.0,
    colors: ['#1a1a1a', '#2d2d2d', '#0a0a0a'],
    durability: 'premium',
  },
];

export const NFC_CHIPS: NFCChip[] = [
  {
    id: 'ntag213',
    name: 'NTAG213',
    memoryBytes: 144,
    urlCapacity: 132,
    price: 1.5,
    description:
      'Entry-level NFC chip. Ideal for simple URLs and basic contact sharing.',
  },
  {
    id: 'ntag215',
    name: 'NTAG215',
    memoryBytes: 504,
    urlCapacity: 488,
    price: 2.5,
    description:
      'Most popular chip. Great for vCards, longer URLs, and moderate data.',
  },
  {
    id: 'ntag216',
    name: 'NTAG216',
    memoryBytes: 888,
    urlCapacity: 854,
    price: 4.0,
    description:
      'Maximum capacity chip. Best for large vCards, multiple records, or detailed data.',
  },
];

export const FINISHES: Finish[] = [
  {
    id: 'matte',
    name: 'Matte',
    description: 'Smooth, non-reflective surface with a professional feel.',
    priceModifier: 1.0,
  },
  {
    id: 'glossy',
    name: 'Glossy',
    description: 'High-shine reflective finish for a polished look.',
    priceModifier: 1.1,
  },
  {
    id: 'satin',
    name: 'Satin',
    description: 'Subtle sheen between matte and glossy. Elegant and refined.',
    priceModifier: 1.15,
  },
  {
    id: 'textured',
    name: 'Textured',
    description: 'Raised pattern for a tactile, premium experience.',
    priceModifier: 1.25,
  },
];

export const FONTS: FontOption[] = [
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat, sans-serif',
    category: 'sans-serif',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: 'Roboto, sans-serif',
    category: 'sans-serif',
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    family: 'Playfair Display, serif',
    category: 'serif',
  },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    family: 'Source Code Pro, monospace',
    category: 'monospace',
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    family: 'Bebas Neue, sans-serif',
    category: 'display',
  },
  {
    id: 'inter',
    name: 'Inter',
    family: 'Inter, sans-serif',
    category: 'sans-serif',
  },
];

export const TEXT_EFFECTS: TextEffect[] = [
  {
    id: 'none',
    name: 'None',
    description: 'Flat printed text on the surface.',
    priceModifier: 0,
  },
  {
    id: 'engraved',
    name: 'Engraved',
    description: 'Text cut into the surface for a subtle, tactile effect.',
    priceModifier: 2.0,
  },
  {
    id: 'raised',
    name: 'Raised',
    description: 'Text elevated above the surface for a bold, 3D look.',
    priceModifier: 2.5,
  },
  {
    id: 'debossed',
    name: 'Debossed',
    description: 'Text pressed into the material creating a recessed impression.',
    priceModifier: 2.0,
  },
  {
    id: 'inlaid',
    name: 'Inlaid',
    description:
      'Text set into the surface with a contrasting material fill.',
    priceModifier: 4.0,
  },
];

export const DEFAULT_CUSTOMIZATION_CONFIG = {
  shape: 'business-card' as const,
  material: 'pla' as const,
  nfcChip: 'ntag215' as const,
  finish: 'matte' as const,
  color: '#000000',
  text: {
    content: '',
    font: 'montserrat',
    size: 12,
    effect: 'none' as const,
    color: '#ffffff',
  },
  designUpload: null,
  quantity: 1,
};
