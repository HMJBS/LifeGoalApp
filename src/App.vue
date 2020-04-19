<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand to="/">Life Object Tracker</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/user">User</b-nav-item>
          <b-nav-item to="/about" >About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>
