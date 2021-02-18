<script>
import Uploader from './Uploader.svelte'
import { showModal, modalContent } from '../stores'

let content = Uploader

</script>


<div class="Modal">
  <div class="Modal-content">  
    <button on:click={showModal.set(!$showModal)}>X</button>
    <svelte:component this={content} />
  </div>
</div>

<style>
  .Modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade .3s 1;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .Modal-content {
    width: 100%;
    max-width: 600px;
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
    transition: color .2s ease;
  }

  button:hover {
    color: rgb(78, 78, 248);
  }

  @keyframes fade {
    from {
    background-color: rgba(0, 0, 0, 0);
    }
    to {
    background-color: rgba(0, 0, 0, 0.7);
    }
  }
</style>
