<template>
    <div class="row">
        <div class="col-default-12">
            <app-input-file
                name="photo"
                button="Upload photo"
                v-model="innerData.photo"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="name"
                placeholder="Name"
                v-model="innerData.name"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="address"
                placeholder="Address"
                v-model="innerData.address"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="phone"
                placeholder="Phone number"
                v-model="innerData.phone"
            />
        </div>
        <div class="col-default-6">
            <app-select
                name="maritalStatus"
                placeholder="Marital status"
                :data="options.maritalStatus"
                v-model="innerData.maritalStatus"
            />
        </div>
        <div class="col-default-6">
            <app-date-picker
                lang="en"
                value-type="format"
                placeholder="Date of birth"
                v-model="innerData.dateOfBirth"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="email"
                type="email"
                placeholder="Email"
                v-model="innerData.email"
            />
        </div>
        <div class="col-default-12">
            <app-input
                name="site"
                v-model="innerData.site"
                placeholder="Personal site"
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
            innerData: this.data,
            options: {
                maritalStatus: [
                    {
                        id: 'married',
                        text: 'Married',
                        disabled: false,
                        selected: false
                    },
                    {
                        id: 'single',
                        text: 'Single',
                        disabled: false,
                        selected: false
                    },
                    {
                        id: 'divorced',
                        text: 'Divorced',
                        disabled: false,
                        selected: false
                    }
                ]
            }
        }
    }
}
</script>
