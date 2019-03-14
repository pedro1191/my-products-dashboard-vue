<template>
  <div class="login">
    <div class="form">
      <form>
        <div class="form-group">
          <label for="exampleInputUserName1">Username</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputUserName1"
            aria-describedby="userNameHelp"
            placeholder
          >
          <small id="userNameHelp" class="form-text text-muted">
            The default username is
            <strong>admin</strong>.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder>
          <small id="emailHelp" class="form-text text-muted">
            The default password is
            <strong>admin</strong>.
          </small>
        </div>
        <button type="submit" class="btn btn-outline-primary">Log in</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  padding-top: 15px;
  padding-bottom: 15px;
}

.login .form {
  text-align: left;
  max-width: 350px;
  margin: auto;
}
</style>
