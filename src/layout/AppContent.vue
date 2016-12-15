<template>
    <div class="container">
        <router-view class=view transition="menu" transition-mode="out-in"></router-view>
    </div>
</template>
<script>
    export default {

    }
</script>

<style>
    .view {
        transition: all .3s ease;
    }

    .menu-enter,
    .menu-leave {
        opacity: 0;
    }
    
    body {
        margin-top: 50px
    }
    
    .container .text-muted {
        margin: 20px 0;
    }
    
    .footer>.container {
        padding-right: 15px;
        padding-left: 15px;
    }
</style>