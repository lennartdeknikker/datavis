<div>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="name" />
    <input type="date" name="dateOfBirth" />
    <input type="file" name="picture" />
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