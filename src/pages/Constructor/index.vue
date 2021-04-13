<template>
    <div class="constructor page">
        <aside class="constructor-aside">
            <div class="constructor-aside__header">
                <app-logo />
            </div>
            <div class="constructor-aside__body">
                <app-accordion initial="first">
                    <app-accordion-item id="personal-information">
                        <template v-slot:header>Personal information</template>
                        <template v-slot:body>Personal information</template>
                    </app-accordion-item>
                    <app-accordion-item id="objective">
                        <template v-slot:header>Objective</template>
                        <template v-slot:body>Objective</template>
                    </app-accordion-item>
                    <app-accordion-item id="education">
                        <template v-slot:header>Education</template>
                        <template v-slot:body>Education</template>
                    </app-accordion-item>
                    <app-accordion-item id="qualifications">
                        <template v-slot:header>Qualifications</template>
                        <template v-slot:body>Qualifications</template>
                    </app-accordion-item>
                    <app-accordion-item id="work-experience">
                        <template v-slot:header>Work experience</template>
                        <template v-slot:body>Work experience</template>
                    </app-accordion-item>
                    <app-accordion-item id="personal-qualities">
                        <template v-slot:header>Personal qualities</template>
                        <template v-slot:body>Personal qualities</template>
                    </app-accordion-item>
                    <app-accordion-item id="special-skills">
                        <template v-slot:header>Special skills</template>
                        <template v-slot:body>Special skills</template>
                    </app-accordion-item>
                    <!-- <app-accordion-item id="awards">
                        <template v-slot:header>Awards</template>
                        <template v-slot:body>Awards</template>
                    </app-accordion-item>
                    <app-accordion-item id="research-experience">
                        <template v-slot:header>Research experience</template>
                        <template v-slot:body>Research experience</template>
                    </app-accordion-item>
                    <app-accordion-item id="publications">
                        <template v-slot:header>Publications</template>
                        <template v-slot:body>Publications</template>
                    </app-accordion-item>
                    <app-accordion-item id="memberships">
                        <template v-slot:header>Memberships</template>
                        <template v-slot:body>Memberships</template>
                    </app-accordion-item>
                    <app-accordion-item id="references">
                        <template v-slot:header>References</template>
                        <template v-slot:body>References</template>
                    </app-accordion-item> -->
                </app-accordion>
            </div>
        </aside>
        <section class="constructor-preview"></section>
    </div>
</template>

<script>
export default {
    name: 'constructor',
    data () {
        return {}
    }
}
</script>

<style lang="scss">
.constructor {
    display: flex;
    flex-flow: row nowrap;
}

.constructor-aside {
    width: 30%;
    min-height: 100%;
    min-width: 30rem;
    max-width: 36rem;
    background-color: $lite-grey;

    &__header {
        padding: 2rem;
        position: relative;
        text-align: center;
        user-select: none;

        &:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            border: 20px solid transparent;
            border-right-color: $white;
            border-top-color: $white;
            border-left-color: $dark-grey;
            border-bottom-color: $dark-grey;
        }
    }
}
</style>
