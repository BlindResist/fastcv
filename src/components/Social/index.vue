<template>
    <div class="social">
        <a
            target="_blank"
            :key="item.name"
            :href="item.link"
            :title="item.name"
            v-for="item in data"
            :class="`social__item icon icon-${item.name}`"
        ></a>
    </div>
</template>

<script>
export default {
    name: 'social',
    data () {
        return {
            data: [
                {
                    name: 'vkontakte',
                    link: 'https://vk.com/blind_resist'
                },
                {
                    name: 'facebook',
                    link: 'https://www.facebook.com/profile.php?id=100002158603006'
                },
                {
                    name: 'instagram',
                    link: 'https://www.instagram.com/artem.anpilov/'
                },
                {
                    name: 'telegram',
                    link: 'https://t.me/BlindResist'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.social {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;

    &__item {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.25rem;
        text-align: center;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        transition: color .3s ease-in-out;

        &+& {
            margin-left: 1rem;
        }

        &:hover {
            color: $yellow-dark;
        }
    }
}
</style>
