<script>
  import { activeCategoryId, categoryColor } from '../stores'

  const categories = [
    {
      id: 'cereals',
      label: 'Cereals & Grains',
      color: '#fff100'
    },
    {
      id: 'pulses',
      label: 'Pulses',
      color: '#ff8c00'
    },
    {
      id: 'starchy_roots',
      label: 'Starchy Roots',
      color: '#e81123'
    },
    {
      id: 'sugar',
      label: 'Sugar',
      color: '#ec008c'
    },
    {
      id: 'oils_and_fats',
      label: 'Oils & Fats',
      color: '#68217a'
    },
    {
      id: 'meat',
      label: 'Meat',
      color: '#00188f'
    },
    {
      id: 'dairy_and_eggs',
      label: 'Dairy & Eggs',
      color: '#00bcf2'
    },
    {
      id: 'fruit_and_vegetables',
      label: 'Fruit & Vegetables',
      color: '#00b294'
    },
    {
      id: 'alcoholic_beverages',
      label: 'Alcoholic beverages',
      color: '#bad80a'
    },
    {
      id: 'other',
      label: 'Other',
      color: '#009e49'
    },
  ]

    const clickHandler = (category) => {
      categoryColor.set(category.color)
      activeCategoryId.set(category.id)
    }

</script>

<nav>
  <ul>
    {#each categories as category}
    <li 
    style={`--category-color: ${category.color}`} 
    class:active="{category.id === $activeCategoryId}" 
    on:click={() => clickHandler(category)}
    >
      {category.label}
    </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
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
    background-color: var(--category-color);
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
    transition: background-color 300ms ease;
  }

  li.active {
    border: 2px solid black;
    color: black;
  }
</style>