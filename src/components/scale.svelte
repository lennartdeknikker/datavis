<script>
  import { percentageOfTotalConsumption, maxForActiveCategory } from '../stores'
</script>

<div class="Scale-container">
  <span>0</span>
  <div class="Scale" style={`width: calc(${$percentageOfTotalConsumption}%);`}/>
  <span>{$maxForActiveCategory} (kcal per person per day)</span>
</div>

<style>
  .Scale-container {
    width: 100vw;
    height: 20px;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    background-color: white;
		overflow: hidden;
  }

  span {
    padding: 0 10px;
    color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 240px;
  }

  .Scale {
    width: 0;
    height: 100%;
    background: linear-gradient(0.25turn, white, var(--category-color));
    box-sizing: border-box;
  }
</style>