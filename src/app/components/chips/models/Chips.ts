// export const CHIP_VALUES: { [key: string]: string[] } = {
//   '1': ['50', '100', '200', '500', '1K', '2K'],
// };

type ChipLabels = '50' | '100' | '200' | '500' | '1K' | '2K';
type ChipValues = 50 | 100 | 200 | 500 | 1000 | 2000;
export type ChipType = { label: ChipLabels; value: ChipValues };
export type SelectedChip = { posX: number; posY: number } & ChipType;

export const CHIP_VALUES: ChipType[] = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '500', value: 500 },
  { label: '1K', value: 1000 },
  { label: '2K', value: 2000 },
];
