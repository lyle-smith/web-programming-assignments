<template>
  <main v-if="isAdmin()">
    <div class="table-container column is-7 mx-auto">
      <table class="table is-fullwidth mt-6">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in session.users">
            <td>
              <figure class="image is-64x64">
                <img :src="user.profilePicture" class="is-rounded" />
              </figure>
            </td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.isAdmin }}</td>
            <td>
              <button class="button is-danger" @click="removeUser(user)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="button is-dark is-fullwidth">Add User</button>
    </div>
  </main>
  <main v-else>
    <div>Can not access this page. Please log in to an admin account.</div>
  </main>
</template>

<script setup lang="ts">
import session, { isAdmin, removeUser } from "../stores/session";
</script>

<style scoped>
img {
  height: 100%;
  width: 100%;
}
</style>
