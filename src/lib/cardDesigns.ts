import type { CardDesign } from './types'

export const CARD_DESIGNS: Record<CardDesign, {
  label: string
  front: string
  back: string
  chipColor: string
  textColor: string
  accent: string
}> = {
  black: {
    label: 'Premium Black',
    front: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
    back: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
    chipColor: 'linear-gradient(135deg, #d4af37, #f5d061, #d4af37)',
    textColor: '#ffffff',
    accent: '#d4af37',
  },
  red: {
    label: 'Premium Red',
    front: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)',
    back: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
    chipColor: 'linear-gradient(135deg, #fde047, #facc15, #fde047)',
    textColor: '#ffffff',
    accent: '#fde047',
  },
  gold: {
    label: 'Premium Gold',
    front: 'linear-gradient(135deg, #d4af37 0%, #f5d061 50%, #c5a028 100%)',
    back: 'linear-gradient(135deg, #c5a028 0%, #d4af37 100%)',
    chipColor: 'linear-gradient(135deg, #78716c, #a8a29e, #78716c)',
    textColor: '#1a1a1a',
    accent: '#1a1a1a',
  },
  blue: {
    label: 'Premium Blue',
    front: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #1e3a8a 100%)',
    back: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    chipColor: 'linear-gradient(135deg, #fde047, #facc15, #fde047)',
    textColor: '#ffffff',
    accent: '#bfdbfe',
  },
}

export function getCardDesignStyle(design: CardDesign | undefined, isBack = false) {
  const d = CARD_DESIGNS[design || 'blue']
  return {
    background: isBack ? d.back : d.front,
    color: d.textColor,
  '--card-accent': d.accent,
  '--card-chip': d.chipColor,
  '--card-text': d.textColor,
  '--card-from': design === 'gold' ? '#d4af37' : design === 'red' ? '#dc2626' : design === 'black' ? '#1a1a1a' : '#1e40af',
    '--card-via': design === 'gold' ? '#f5d061' : design === 'red' ? '#991b1b' : design === 'black' ? '#0d0d0d' : '#1d4ed8',
    '--card-to': design === 'gold' ? '#c5a028' : design === 'red' ? '#7f1d1d' : design === 'black' ? '#1a1a1a' : '#1e3a8a',
  } as React.CSSProperties
}
