<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  
}

#app {
  position: relative;
  font-family: Poppins, sans-serif;
  -webkit-font-smoothing: antialiase d;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), #dfdddd);
  overflow-x: auto;
}
</style>
