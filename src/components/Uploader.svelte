<script>

  let latitude = ''
  let longitude = ''

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
  });
  }

  const readOnly = event => event.preventDefault()

</script>

<div>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend>
        <span>
          About you
        </span>
      </legend>
      <label for="name">Your name:</label>
      <input type="text" name="name" placeholder="name" required/>
      <label for="dateOfBirth">Your date of birth:</label>
      <input type="date" name="dateOfBirth" required />
    </fieldset>
    <fieldset>
      <legend>
        <span>
          Your fridge
        </span>
      </legend>
      <input type="file" name="picture" required />
    </fieldset>
    <fieldset>
      <legend>
        <span>
          Your Location
        </span>
      </legend>
      <input type="button" on:click={getLocation} value="get location">
      <div class="locationInputContainer">
        <label for="latitude" class="locationLabel">lat:</label>
        <input type="text" name="latitude" value={latitude} required on:keydown={readOnly} class="locationInput">
        <label for="longitude" class="locationLabel">long:</label>
        <input id="longitude" type="text" name="longitude" value={longitude} required on:keydown={readOnly} class="locationInput">
      </div>
    </fieldset>
    <input type="submit" value="send">
  </form>
</div>

<style>

  div {
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    width: calc(100% - 60px);
    height: 100%;
    color: rgb(111, 111, 252);
    position: relative;
  }
  fieldset {
    flex: 1;
    display: flex;
    margin-bottom: 10px;
    width: calc(100% - 30px);
    flex-wrap: wrap;
    border: none;
    background-color: rgb(219, 219, 250);
    padding: 0 20px 20px 20px;
  }

  fieldset:last-of-type {
    margin-bottom: 15px;
  }

  legend {
    background-color: white;
    color: rgb(111, 111, 252);
    padding: 3px 10px 3px 5px;
    width: 150px;
    font-weight: bold;
    text-align: center;
  }

  legend span {
    display: block;
    width: 100%;
    text-align: center;
  }

  label, input {
    width: 100%;
  }

  input + label {
    margin-top: 10px;
  }

  input {
    margin-left: 10px;
    padding: 10px;
    border: none;
  }

  input[type=file] {
    background-color: white;
    border: none;
    padding: 10px;
    color: rgb(111, 111, 252);
    text-transform: uppercase;
    font-weight: bold;
    width: 100%;
    margin-top: 10px;
    align-self: center;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease;
  }

  input[type=button] {
    background-color: white;
    border: none;
    padding: 10px;
    color: rgb(111, 111, 252);
    text-transform: uppercase;
    font-weight: bold;
    width: fit-content;
    margin-top: 10px;
    align-self: center;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease;
  }

  .locationInputContainer {
    width: 100%;
  }

  .locationInput {
    width: 30%;
    height: fit-content;
    margin-top: 10px;
    background-color: rgb(219, 219, 250);
    color: rgb(111, 111, 252);
  }

  .locationLabel {
    width: fit-content;
    padding: 10px;
  }

  input[type=button]:hover, input[type=submit]:hover, input[type=file]:hover {
    color: white;
    background-color: rgb(111, 111, 252);
  }

  input[type=submit] {
    transition: background-color .2s ease, color .2s ease;
    cursor: pointer;
    background-color: white;
    border: none;
    padding: 10px;
    color: rgb(111, 111, 252);
    text-transform: uppercase;
    font-weight: bold;
  }

  .locationInput {
  }

</style>