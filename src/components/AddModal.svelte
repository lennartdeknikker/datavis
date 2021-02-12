<script>
import Uploader from '../components/Uploader.svelte'
import { showAddModal } from '../stores'
</script>


<div class="AddModal">
  <div class="AddModal-content">  
    <button on:click={showAddModal.set(!$showAddModal)}>X</button>
    <Uploader />
  </div>
</div>

<style>
  .AddModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.336);
  }

  .AddModal-content {
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 450px;
    position: relative;
    background-color: rgb(183, 183, 255);
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  button {
    position: absolute;
    right: 20px;
    border: none;
    background-color: transparent;
    color: white;
    width: 40px;
    height: 40px;
    font-size: 1.2em;
    cursor: pointer;
  }
</style>