import type { CustomizationConfig, PriceBreakdown } from '@/types/customization';
import { SHAPES, MATERIALS, NFC_CHIPS, TEXT_EFFECTS } from '@/lib/constants/customization';

const BASE_PRICE = 10.0;
const TEXT_PRICE = 3.0;
const DESIGN_UPLOAD_PRICE = 5.0;

interface QuantityDiscount {
  minQuantity: number;
  discount: number;
}

const QUANTITY_DISCOUNTS: QuantityDiscount[] = [
  { minQuantity: 100, discount: 0.25 },
  { minQuantity: 50, discount: 0.15 },
  { minQuantity: 25, discount: 0.10 },
];

function getQuantityDiscount(quantity: number): number {
  for (const tier of QUANTITY_DISCOUNTS) {
    if (quantity >= tier.minQuantity) {
      return tier.discount;
    }
  }
  return 0;
}

export function calculatePrice(config: CustomizationConfig): PriceBreakdown {
  const shape = SHAPES.find((s) => s.id === config.shape);
  const material = MATERIALS.find((m) => m.id === config.material);
  const nfcChip = NFC_CHIPS.find((c) => c.id === config.nfcChip);
  const textEffect = TEXT_EFFECTS.find((e) => e.id === config.text.effect);

  const sizeModifier = shape?.sizeModifier ?? 1.0;
  const materialModifier = material?.priceModifier ?? 1.0;
  const nfcChipPrice = nfcChip?.price ?? 2.5;
  const textPrice = config.text.content.trim().length > 0
    ? TEXT_PRICE + (textEffect?.priceModifier ?? 0)
    : 0;
  const designUploadPrice = config.designUpload?.file ? DESIGN_UPLOAD_PRICE : 0;

  const subtotalPerUnit =
    BASE_PRICE * sizeModifier * materialModifier +
    nfcChipPrice +
    textPrice +
    designUploadPrice;

  const discountRate = getQuantityDiscount(config.quantity);
  const quantityDiscount = subtotalPerUnit * discountRate;
  const finalPerUnit = subtotalPerUnit - quantityDiscount;
  const total = finalPerUnit * config.quantity;

  return {
    basePrice: BASE_PRICE,
    sizeModifier,
    materialModifier,
    nfcChipPrice,
    textPrice,
    designUploadPrice,
    quantityDiscount,
    subtotalPerUnit,
    total: Math.round(total * 100) / 100,
  };
}

export function calculatePriceRange(
  config: CustomizationConfig,
): { min: number; max: number; perUnit: number } {
  const breakdown = calculatePrice(config);
  const perUnit = breakdown.subtotalPerUnit - breakdown.quantityDiscount;

  return {
    min: Math.round(perUnit * 100) / 100,
    max: Math.round(perUnit * 1.2 * 100) / 100,
    perUnit: Math.round(perUnit * 100) / 100,
  };
}
