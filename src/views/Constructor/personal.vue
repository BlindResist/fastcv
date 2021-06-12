<template>
    <div class="row">
        <div class="col-default-12">
            <app-input-file
                name="photo"
                v-model="innerData.photo"
                :description="$t('fields.uploadFile')"
                :button-text="$t('buttons.uploadPhoto')"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="name"
                v-model="innerData.name"
                :placeholder="$t('fields.name')"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="address"
                v-model="innerData.address"
                :placeholder="$t('fields.address')"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="phone"
                v-model="innerData.phone"
                :placeholder="$t('fields.phone')"
            />
        </div>
        <div class="col-default-6 col-mobile-12">
            <app-select
                name="maritalStatus"
                :data="maritalStatus"
                v-model="innerData.maritalStatus"
                :placeholder="$t('fields.maritalStatus')"
            />
        </div>
        <div class="col-default-6 col-mobile-12">
            <app-date-picker
                lang="en"
                value-type="format"
                v-model="innerData.dateOfBirth"
                :placeholder="$t('fields.dateOfBirth')"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="email"
                type="email"
                v-model="innerData.email"
                :placeholder="$t('fields.email')"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="site"
                v-model="innerData.site"
                :placeholder="$t('fields.site')"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import AppInput from '@/components/AppInput/index.vue'
import AppSelect from '@/components/AppSelect/index.vue'
import { Component, Prop } from 'vue-property-decorator'
import AppInputFile from '@/components/AppInputFile/index.vue'
import AppDatePicker from '@/components/AppDatePicker/index.vue'
import { ComponentEmitters, Data } from '@/mixins/componentEmitters.ts'

@Component({
    components: {
        AppInput,
        AppSelect,
        AppInputFile,
        AppDatePicker
    }
})

export default class Personal extends mixins(ComponentEmitters) {
    @Prop({
        type: String,
        required: true
    }) readonly type!: string

    @Prop({
        type: Object,
        default: Data
    }) readonly data!: Data

    innerData: Data

    constructor () {
        super()
        this.innerData = this.data
    }

    get maritalStatus (): {id: string, text: string, disabled: boolean, selected: boolean}[] {
        return [
            {
                id: 'married',
                disabled: false,
                selected: false,
                text: this.$t('selects.maritalStatus[0]')
            },
            {
                id: 'single',
                disabled: false,
                selected: false,
                text: this.$t('selects.maritalStatus[1]')
            },
            {
                id: 'divorced',
                disabled: false,
                selected: false,
                text: this.$t('selects.maritalStatus[2]')
            }
        ].map(item => {
            if (this.innerData.maritalStatus.length) {
                if (item.text === this.innerData.maritalStatus) {
                    item.selected = true
                }
            }

            return item
        })
    }
}
</script>
