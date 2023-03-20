
<template>
    <v-btn @click="setLanguage" :style="{ color: $background }" class="p-0 pt-1 mr-2 ml-3" icon="mdi-dots-vertical">
        <div style="border-bottom:2px solid #000;">
            <span v-if="lang == 'en'" class="positin-relative fw-bold" top="">{{ lang }}/<span
                    class="text-dark">mm</span></span>
            <span v-else class="positin-relative fw-bold" top="">{{ lang }}/<span class="text-dark">en</span></span>
        </div>
    </v-btn>
</template>
<script>
import LanguageService from '../lang/LanguageService';
export default {
    data() {
        return {
            lang: LanguageService.getLanguage(),
        }
    },
    methods: {
        setLanguage() {
            if (LanguageService.getLanguage() == 'en') this.lang = 'mm'; else this.lang = 'en';
            LanguageService.setLanguage(this.lang);
            this.$i18n.locale = this.lang;
        }
    },
    mounted() {
        this.$i18n.locale = this.lang;
    }
}
</script>
<style lang="">

</style>
