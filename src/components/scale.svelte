<script>
  import { percentageOfTotalConsumption, maxForActiveCategory } from '../stores'
</script>

<div class="Scale-wrapper">
  <span>kcal per person per day</span>
  <div class="Scale-container">
    <span>0</span>
    <div class="Scale" style={`width: calc(${$percentageOfTotalConsumption}%);`}/>
    <span>{$maxForActiveCategory}</span>
  </div>
</div>

<style>

  .Scale-wrapper {
    width: 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    bottom: 20px;
  }

  .Scale-wrapper > span {
    mix-blend-mode: exclusion;
  }

  span {
    color: white;
    display: block;
  }

  .Scale-container {
    width: 300px;
    height: 20px;
    display: flex;
		overflow: hidden;
    border-radius: 10px;
    justify-content: space-between;
    border: 2px solid var(--background-color);
    background-color: white;
  }

  .Scale-wrapper .Scale-container span {
    padding: 0 10px;
    display: flex;
    justify-content: center;
    background-color: var(--background-color);
    align-items: center;
    width: 30px;
  }

  .Scale {
    width: 0;
    height: 100%;
    background: linear-gradient(0.25turn, white, var(--category-color));
    box-sizing: border-box;
    position: relative;
  }
</style>