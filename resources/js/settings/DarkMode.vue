<template>
    <v-btn @click="toggleTheme" icon="mdi-dots-vertical">
        <div class="mt-2">
            <input class="toggle" type="checkbox" :checked="!theme.global.current.value.dark">
        </div>
    </v-btn>
</template>

<script>
import {
    useTheme
} from 'vuetify';
export default {
    setup() {
        const theme = useTheme()
        const hours = new Date().getHours();
        return {
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'zplus' : 'dark'
        }
    },
    created() {
        // var _gaq = _gaq || [];
        // _gaq.push(['_setAccount', 'UA-36251023-1']);
        // _gaq.push(['_setDomainName', 'jqueryscript.net']);
        // _gaq.push(['_trackPageview']);

        // (function () {
        //     var ga = document.createElement('script');
        //     ga.type = 'text/javascript';
        //     ga.async = true;
        //     ga.src = 'https://' + 'zakerxa.github.io/Asia-LocalTimeZone/js/clock.js';
        //     var s = document.getElementsByTagName('script')[0];
        //     s.parentNode.insertBefore(ga, s);
        // })();
    }
}
</script>

<style lang="scss" scoped>
.toggle {
    --size: 1.5rem;

    appearance: none;
    outline: none;
    cursor: pointer;

    width: var(--size);
    height: var(--size);
    box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
    border-radius: 999px;
    color: hsl(0, 8%, 31%);

    transition: all 500ms;

    &:checked {
        --ray-size: calc(var(--size) * -0.4);
        --offset-orthogonal: calc(var(--size) * 0.65);
        --offset-diagonal: calc(var(--size) * 0.45);

        transform: scale(0.75);
        color: hsl(34, 100%, 78%);
        box-shadow:
            inset 0 0 0 var(--size),
            calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
            var(--offset-orthogonal) 0 0 var(--ray-size),
            0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
            0 var(--offset-orthogonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
            var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
            var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
        ;
    }
}

.toggle {
    z-index: 1;

    &:checked {
        &~.background {
            --bg: white;
        }

        &~.title {
            --color: hsl(40, 99%, 73%);
        }
    }
}
</style>
