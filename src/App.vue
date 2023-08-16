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
      <div class="field is-grouped mb-5">
        <p class="control">
          <button type="button" class="button is-info" @click="changeOrder">Date {{ order === 'desc' ? '&#8595;' : '&#8593;' }}</button>
        </p>
      </div>
    </form>

    <div class="card mb-5" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-content" :class="{'has-background-success-light' : todo.done}">
        <div class="content">
          <div class="columns">
            <div class="column is-mobile is-vcentered" :class="{'has-text-success line-through': todo.done}">{{ todo.content }}</div>
            <div class="column is-5 has-text-right">
              <button class="button" :class="todo.done ? 'is-success' : 'is-light'" @click="toggleDone(todo.id)">&check;</button>
              <button class="button is-danger ml-2" @click="deleteTodo(todo.id)">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { db } from '@/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const todos           = ref([]);
const newTodoContent  = ref('');
const order           = ref('desc');
const dbCollection    = collection(db, "todos");
const orderQueries = {
  'asc': query(dbCollection, orderBy('date', 'asc')),
  'desc': query(dbCollection, orderBy('date', 'desc')),
}

onMounted(() => {

  onSnapshot(orderQueries[order.value], (querySnapshot) => {
    processFbData(querySnapshot);
  });
})

const changeOrder = async () => {
  order.value = order.value === 'desc' ? 'asc' : 'desc';

  processFbData(await getDocs(orderQueries[order.value]));
};

const processFbData = (querySnapshot) => {
  let fbTodos = [];
  querySnapshot.forEach((doc) => {
    fbTodos.push({
      id      : doc.id,
      content : doc.data().content,
      done    : doc.data().done,
    });
  });
  todos.value = fbTodos;
}

const addTodo = () => {
  addDoc(dbCollection, {
    content : newTodoContent.value,
    done    : false,
    date    : Date.now()
  });

  newTodoContent.value = '';
}
const deleteTodo = (id) => {
  deleteDoc(doc(dbCollection, id));
}
const toggleDone = (id) => {
  let index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(dbCollection, id), {
    done: !todos.value[index].done
  });
}

</script>

<style>
@import 'bulma/css/bulma.min.css';

.app-wrapper {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
