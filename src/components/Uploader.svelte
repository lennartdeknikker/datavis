<script>

  let location = ''

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
    location = `${position.coords.latitude}, ${position.coords.longitude}`
  });
  }
</script>

<div>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend>About you</legend>
      <label for="name">Your name:</label>
      <input type="text" name="name" placeholder="name"/>
      <label for="dateOfBirth">Your date of birth:</label>
      <input type="date" name="dateOfBirth" />
    </fieldset>
    <fieldset>
      <legend>About your fridge</legend>
      <label for="picture">Photo:</label>
      <input type="file" name="picture" />
      <label for="location">Location:</label>
      <input type="text" name="location" value={location} readonly>
      <input type="button" on:click={getLocation} value="get location">
    </fieldset>
    <input type="submit" value="send">
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
  }
</style>