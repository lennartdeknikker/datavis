<script>
  import { activeCategoryId } from '../stores'

  const categories = [
    {
      id: 'cereals',
      label: 'Cereals & Grains'
    },
    {
      id: 'pulses',
      label: 'Pulses'
    },
    {
      id: 'starchy_roots',
      label: 'Starchy Roots'
    },
    {
      id: 'sugar',
      label: 'Sugar'
    },
    {
      id: 'oils_and_fats',
      label: 'Oils & Fats'
    },
    {
      id: 'meat',
      label: 'Meat'
    },
    {
      id: 'dairy_and_eggs',
      label: 'Dairy & Eggs'
    },
    {
      id: 'fruit_and_vegetables',
      label: 'Fruit & Vegetables'
    },
    {
      id: 'other',
      label: 'Other'
    },
    {
      id: 'alcoholic_beverages',
      label: 'Alcoholic beverages'
    }
  ]

</script>

<nav>
  <ul>
    {#each categories as category, index}
    <li class:active="{category.id === $activeCategoryId}" on:click={() => activeCategoryId.set(category.id)}>{category.label}</li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    width: 100vw;
  }

  ul {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    background-color: rgb(183, 183, 255);
    display: flex;
    height: 70px;
    width: 150px;
    padding: 10px;
    margin: 2px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    cursor: pointer;
  }

  li.active {
    background-color: rgb(111, 111, 252);
    color: white;
  }
</style>