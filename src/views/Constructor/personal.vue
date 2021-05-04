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
        <div class="col-default-6">
            <app-select
                name="maritalStatus"
                :data="maritalStatus"
                v-model="innerData.maritalStatus"
                :placeholder="$t('fields.maritalStatus')"
            />
        </div>
        <div class="col-default-6">
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

<script>
import componentEmitters from '@/mixins/componentEmitters'

export default {
    name: 'personal',
    mixins: [componentEmitters('personal')],
    props: {
        type: {
            type: String,
            default: '',
            required: true
        },
        data: {
            type: Object,
            default: () => ({
                site: '',
                name: '',
                photo: '',
                phone: '',
                email: '',
                address: '',
                dateOfBirth: '',
                maritalStatus: ''
            })
        }
    },
    data () {
        return {
            innerData: this.data
        }
    },
    computed: {
        maritalStatus () {
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
            ]
        }
    }
}
</script>
