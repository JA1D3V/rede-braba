<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

html {
    font-size: 100%;
}

::placeholder {
  color: #e6e6e6;
}

.mainbtn {
  background-color: #FF6700 !important;
  color: #e6e6e6 !important;
}

.sndbtn {
  background-color: #1B9AAA !important;
  color: #e6e6e6 !important;
}
</style>
