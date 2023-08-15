<template>
  <div class="app-wrapper">
    <div class="title has-text-centered">Project-To-Do</div>

    <div class="field is-grouped">
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Add todo">
      </p>
      <p class="control">
        <a class="button is-info">
          Add
        </a>
      </p>
    </div>

    <div class="card mb-5" v-for="i in 3">
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column is-mobile is-vcentered">Lorem ipsum leo risus</div>
            <div class="column is-5 has-text-right">
              <button class="button is-light">&check;</button>
              <button class="button is-danger ml-2">&cross;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
@import 'bulma/css/bulma.min.css';

.app-wrapper {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
