<template>
  <div class="profile">
    <h1>Test Profile</h1>
    <div v-if="profiles.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addprofile' }" class="">Add Profile</router-link>
      </div>
      <table>
        <tr>
          <td width="10%">Username</td>
          <td width="10%">Kills</td>
          <td width="10%">Deaths</td>
          <td width="10%">Matches Played</td>
          <td width="10%">Matches Won</td>
          <td width="10%" align="center">Action</td>
        </tr>
        <tr v-for="profile in profiles">
          <td>{{ profile.username }}</td>
          <td>{{ profile.kills }}</td>
          <td>{{ profile.deaths }}</td>
          <td>{{ profile.matchesP }}</td>
          <td>{{ profile.matchesW }}</td>
          <td align="center">
            <a href="#" @click="deleteProfile(profile._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no profiles.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addprofile' }" class="add_profile_link">Add Profile</router-link>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import getProfile from '@/services/getProfile'
export default {
  name: 'posts',
  data () {
    return {
      posts: [],
      profiles: []
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const response = await getProfile.fetchProfiles()
      this.profiles = response.data.profiles
    },
    async deleteProfile (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        getProfile.deleteProfile(id)
        $this.$router.go({
          path: '/profiles'
        })
      })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_profile_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
