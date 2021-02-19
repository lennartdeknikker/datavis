<script>
  import { showModal, modalContent } from '../stores'

  const showUploadModal = () => {
    modalContent.set('upload')
    showModal.set(true)
  }
</script>

<style>
  button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 100%;
    border: none;
    background-color: white;
    color: var(--background-color);
    width: 40px;
    height: 40px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease, border .2s ease;
  }

  button:hover {
    color: white;
    background-color: var(--background-color);
    border: 2px solid white;
  }
</style>

<button on:click={showUploadModal}>
  +
</button>