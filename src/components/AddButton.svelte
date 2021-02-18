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
    bottom: 40px;
    border-radius: 100%;
    border: none;
    background-color: rgb(183, 183, 255);
    color: white;
    width: 40px;
    height: 40px;
    font-size: 1.2em;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(111, 111, 252);
  }
</style>

<button on:click={showUploadModal}>
  +
</button>