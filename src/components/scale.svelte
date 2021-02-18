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

  .Scale-wrapper span {
    color: white;
  }

  .Scale-container {
    width: 300px;
    height: 20px;
    display: flex;
    background-color: white;
		overflow: hidden;
  }

  .Scale-wrapper .Scale-container span {
    padding: 0 10px;
    color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Scale {
    width: 0;
    height: 100%;
    background: linear-gradient(0.25turn, white, var(--category-color));
    box-sizing: border-box;
  }
</style>