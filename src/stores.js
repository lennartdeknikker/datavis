import { writable, derived } from 'svelte/store';

export const activeCategoryId = writable('cereals');
export const totalForActiveCategory = writable(60);
export const maxForActiveCategory = writable(60);
export const totalConsumption = writable(0);
export const showModal = writable(false);
export const modalContent = writable('upload');
export const categoryColor = writable('#fff100');

export const percentageOfTotalConsumption = derived(
  [totalForActiveCategory, totalConsumption],
  ([$totalForActiveCategory, $totalConsumption]) => Math.round($totalForActiveCategory / $totalConsumption * 100)
  , 0)
