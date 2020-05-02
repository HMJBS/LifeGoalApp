<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand class="font-weight-bolder" to="/">Life Goal Tracker</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/user">User</b-nav-item>
          <b-nav-item to="/about" >About</b-nav-item>
        </b-navbar-nav>

        <!-- Right Alligned-->
        <b-navbar-nav class="ml-auto">
          <b-avatar variant="primary" rounded>{{ userName }}</b-avatar>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>
