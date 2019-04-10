<template>
  <div class="home">
    <div class="grid">
      <div class="navCover"></div>
      <cheader class="head"></cheader>
      <div class="cont">
        <h1>Home Page</h1>
      </div>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {}
}
</script>
<style type="text/css">

.head {
  grid-area: head;
}

.navCover {
  grid-area: navCover;
}

.cont {
  grid-area: cont;
}

.grid {
  display: grid;
  grid-template-areas:
    'navCover head'
    'navCover cont';
  grid-template-columns: 50px auto;
  /*grid-gap: 10px;*/

}

.home{
  background-color: #171819;
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
}

.topCont{
  height:2em;
}
</style>
