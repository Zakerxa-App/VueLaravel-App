<template>
<!-- Nav Bar -->
<div class=" justify-content-center position-fixed w-100 d-md-none" style="bottom: -2px;z-index:9;background:#fff;">
    <div class="row ml-0 pt-3 pb-3">

        <div v-if="cookietoken == ''" class="col col-md-2 text-center">
            <img @click="dailyLogs(),tap.play()" class="navlogo" src="assets/icon/history/dashboard.png" alt="">
        </div>

        <div v-else class="col col-md-2 text-center">
            <img @click="dailyLogs(),tap.play()" class="navlogo" src="assets/icon/history/dashboard.png" alt="">
        </div>

        <div class="col col-md-2 p-0 text-center">
            <img @click="history2dclick(),tap.play()" class="navlogo" src="assets/icon/calendar/calendar.png" alt="">
        </div>

        <div class="col col-md-2 col-md-1 pt-md-1 text-center">
            <img @click="navMenuClick()" class="navlogomid" src="assets/icon/menu/applications.png" alt="">
        </div>

        <div class="col col-md-2 p-0 text-center">
            <img @click="history3dclick()" class="navlogo" src="assets/icon/calendar/calendar3.png" alt="">
        </div>

        <div class="col col-md-2 text-center">
            <img @click="helpClick(),tap.play()" class="navlogo" src="assets/icon/help.png" alt="">
        </div>

    </div>

</div>
</template>

<script>
import {
    useTheme
} from 'vuetify'
export default {
    setup() {
        const theme = useTheme()

        return {
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'zplus' : 'dark'
        }
    },
    mounted() {
        console.log();
    }
}
</script>

<style></style>
