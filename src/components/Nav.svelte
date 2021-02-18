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
    <div class="icon-container">
      <img src={`icons/${category.id}.svg`} alt={category.label}>
    </div>
    <span>
      {category.label}
    </span>
    </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    width: 100vw;
    position: absolute;
    top: 0;
    padding: 10px;
    left: 0;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0;
    min-height: 150px;
  }
  
  li {
    background-color: var(--category-color);
    display: flex;
    width: 100%;
    height: 500px;
    max-height: 70px;
    max-width: 70px;
    padding: 10px;
    margin: 2px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    padding: 5px;
    text-align: center;
    color: white;
    cursor: pointer;
    opacity: .5;
    transition: opacity 300ms ease, max-width .2s ease, max-height .2s ease;
    flex-direction: column;
    border-radius: 100%;
  }

  li span {
    max-height: 0;
    max-width: 0;
    opacity: 0;
    transition: opacity 300ms ease, max-width .2s ease, max-height .2s ease;
  }

  li:hover {
    opacity: 1;
  }

  li.active {
    max-height: 130px;
    max-width: 130px;
    color: var(--background-color);
    opacity: 1;
  }

  li.active span {
    max-height: 300px;
    max-width: 300px;
    opacity: 1;
  }

  .icon-container {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: white;
  }

  img {
    width: 50px;
    height: 50px;
  }
</style>