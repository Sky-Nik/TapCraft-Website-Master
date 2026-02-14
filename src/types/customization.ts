export type ShapeId =
  | 'business-card'
  | 'round-tag'
  | 'square-tag'
  | 'custom-rectangle'
  | 'keychain'
  | 'badge';

export interface Shape {
  id: ShapeId;
  name: string;
  description: string;
  defaultDimensions: {
    width: number;
    height: number;
    unit: 'mm';
  };
  sizeModifier: number;
}

export type MaterialId =
  | 'pla'
  | 'petg'
  | 'resin'
  | 'wood-filled-pla'
  | 'carbon-fiber-pla';

export interface Material {
  id: MaterialId;
  name: string;
  description: string;
  priceModifier: number;
  colors: string[];
  durability: 'standard' | 'high' | 'premium';
}

export type NFCChipId = 'ntag213' | 'ntag215' | 'ntag216';

export interface NFCChip {
  id: NFCChipId;
  name: string;
  memoryBytes: number;
  urlCapacity: number;
  price: number;
  description: string;
}

export type FinishId = 'matte' | 'glossy' | 'satin' | 'textured';

export interface Finish {
  id: FinishId;
  name: string;
  description: string;
  priceModifier: number;
}

export interface FontOption {
  id: string;
  name: string;
  family: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
}

export type TextEffectId =
  | 'none'
  | 'engraved'
  | 'raised'
  | 'debossed'
  | 'inlaid';

export interface TextEffect {
  id: TextEffectId;
  name: string;
  description: string;
  priceModifier: number;
}

export interface TextConfig {
  content: string;
  font: string;
  size: number;
  effect: TextEffectId;
  color: string;
}

export interface DesignUpload {
  file: File | null;
  previewUrl: string | null;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface CustomizationConfig {
  shape: ShapeId;
  material: MaterialId;
  nfcChip: NFCChipId;
  finish: FinishId;
  color: string;
  text: TextConfig;
  designUpload: DesignUpload | null;
  quantity: number;
}

export interface PriceBreakdown {
  basePrice: number;
  sizeModifier: number;
  materialModifier: number;
  nfcChipPrice: number;
  textPrice: number;
  designUploadPrice: number;
  quantityDiscount: number;
  subtotalPerUnit: number;
  total: number;
}
