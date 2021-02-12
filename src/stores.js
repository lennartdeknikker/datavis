import { writable, derived } from 'svelte/store';

export const activeCategoryId = writable('cereals');
export const totalForActiveCategory = writable(60);
export const maxForActiveCategory = writable(60);
export const totalConsumption = writable(0);

export const percentageOfTotalConsumption = derived(
  [totalForActiveCategory, totalConsumption],
  ([$totalForActiveCategory, $totalConsumption]) => {
    const percentage = Math.round($totalForActiveCategory / $totalConsumption * 100)
    console.log('🚀 ~ percentage', percentage)
    return percentage
  }, 0)
