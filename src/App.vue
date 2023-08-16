<template>
  <div class="app-wrapper">
    <div class="title has-text-centered">Project-To-Do</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" v-model="newTodoContent" placeholder="Add todo">
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!newTodoContent">Add</button>
        </p>
      </div>
    </form>

    <div class="card mb-5" v-for="todo in todos" :key="todo.id">
      <div class="card-content" data-id="{{todo.id}}">
        <div class="content">
          <div class="columns">
            <div class="column is-mobile is-vcentered">{{ todo.content }}</div>
            <div class="column is-5 has-text-right">
              <button class="button is-light" v-if="!todo.done">&check;</button>
              <button class="button is-danger ml-2">&cross;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const todos           = ref([]);
const newTodoContent  = ref('');

const addTodo = function () {
  const newTodo = {
    id      : uuidv4(),
    content : newTodoContent.value,
    done    : false
  }

  todos.value.unshift(newTodo);
  newTodoContent.value = '';
}
</script>

<style>
@import 'bulma/css/bulma.min.css';

.app-wrapper {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
