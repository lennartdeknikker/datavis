<script>

  let latitude = ''
  let longitude = ''

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
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
      <legend>Your fridge</legend>
      <label for="picture">Photo:</label>
      <input type="file" name="picture" />
    </fieldset>
    <fieldset>
      <legend>Location</legend>
      <label for="latitude">Latitude:</label>
      <input type="text" name="latitude" value={latitude} readonly>
      <label for="longitude">Longitude:</label>
      <input type="text" name="longitude" value={longitude} readonly>
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
  }
</style>