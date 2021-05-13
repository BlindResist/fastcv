<template>
    <div class="share">
        <span class="share__text">{{ $t('mainpage.share') }}</span>
        <div class="share__links">
            <a
                target="_blank"
                :key="item.name"
                :href="item.link"
                :title="item.name"
                v-for="item in share"
                :class="`share__link icon icon-${item.name}`"
            ></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'share',
    data () {
        return {
            desc: this.$t('mainpage.text'),
            url: 'http://www.fastcv.online',
            title: this.$t('mainpage.title'),
            image: ''
        }
    },
    computed: {
        share () {
            return [
                {
                    name: 'facebook',
                    link: `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
                },
                {
                    name: 'twitter',
                    link: `https://twitter.com/share?url=${this.url}&text=${this.desc}`
                },
                {
                    name: 'vkontakte',
                    link: `http://vk.com/share.php?url=${this.url}&title=${this.title}&description=${this.desc}&image=${this.image}&noparse=true`
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.share {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    &__text {
        display: block;
        margin-right: 1rem;
    }

    &__links {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
    }

    &__link {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 .5rem;
        font-size: 1.5rem;
        transition: color $transition;

        &:hover {
            color: $yellow-dark;
        }
    }
}
</style>
