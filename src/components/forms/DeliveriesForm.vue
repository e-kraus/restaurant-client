<template>
  <div>
    <hero-bar>
      {{ heroTitle }}
      <router-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field
              label="Delivery ID"
              horizontal
            >
              <b-input
                v-model="form.id"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <hr>
            <hr>
            <b-field
              label="Order ID"
              message="Order ID"
              horizontal
            >
              <b-input
                v-model="form.order_id"
                placeholder="e.g. 423"
              />
            </b-field>
            <b-field
              label="Customer ID"
              message="Customer ID"
              horizontal
            >
              <b-input
                v-model="form.user_id"
                placeholder="e.g. The ID of the customer"
              />
            </b-field>

            <b-field
              label="Payment Status"
              message=""
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.payment_status"
                  placeholder="Select one option"
                >
                  <option value="1">
                    Paid
                  </option>
                  <option value="0">
                    Not Paid
                  </option>
                </b-select>
              </div>
            </b-field>

            <b-field
              label="Dispatch Status"
              message=""
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.dispatch_status"
                  placeholder="Select one option"
                >
                  <option value="1">
                    Dispatched
                  </option>
                  <option value="0">
                    Not Dispatched
                  </option>
                </b-select>
              </div>
            </b-field>

            <b-field
              label="Deliver Status"
              message=""
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.delivery_status"
                  placeholder="Select one option"
                >
                  <option value="1">
                    Delivered
                  </option>
                  <option value="0">
                    Not Delivered
                  </option>
                </b-select>
              </div>
            </b-field>

            <hr>
            <b-field horizontal>
              <b-button
                type="is-info"
                :loading="isLoading"
                native-type="submit"
              >
                Submit
              </b-button>
              <b-button
                type=""
                :loading="isLoading"
                @click="$router.push('/dashboard/deliveries')"
              >
                Back
              </b-button>
            </b-field>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardComponent from '@/components/BaseCardComponent.vue'

export default defineComponent({
  name: 'DeliveriesForm',
  components: {
    CardComponent,
    Tiles,
    HeroBar
  },

  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isProfileExists: false,
      isLoading: false,
      form: {
        user_id: '',
        order_id: '',
        dispatch_status: '',
        payment_status: '',
        delivery_status: ''
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Deliveries',
        this.isProfileExists ? this.form.name : 'New Delivery'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create Delivery'
    },
    heroRouterLinkTo () {
      return this.isProfileExists
        ? { name: 'deliveries.new' }
        : { name: 'Deliveries' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Delivery' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Delivery' : 'Create Delivery'
    },
    ...mapState({
      deliveries: (state) => state.deliveries.deliveries
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.order_id = ''
        this.form.user_id = ''
        this.form.payment_status = ''
        this.form.dispatch_status = ''
        this.form.delivery_status = ''
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.deliveries.find(
          (deliveries) => deliveries.id === this.$route.params.id
        )

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.order_id = item.order_id
          this.form.user_id = item.user_id
          this.form.payment_status = item.payment_status
          this.form.dispatch_status = item.dispatch_status
          this.form.delivery_status = item.delivery_status
        }
      } else {
        this.$router.push({ name: 'deliveries.new' })
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      const newDelivery = {
        order_id: this.form.order_id,
        user_id: this.form.user_id,
        payment_status: this.form.payment_status,
        dispatch_status: this.form.dispatch_status,
        delivery_status: this.form.delivery_status
      }
      const updateDelivery = {
        deliveryId: this.$route.params.id,
        deliveries: this.form
      }
      console.log('delivery item form', this.form)
      console.log('deliveryId', this.$route.params.id)
      if (this.$route.params.id) {
        this.$store
          .dispatch('deliveries/updateDelivery', updateDelivery)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open({
                  message: 'Successfully updated the delivery!',
                  queue: false
                })
              }, 750)
            } else {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open({
                  message: 'Failed to update the delivery!',
                  queue: false
                })
              }, 750)
            }
          })
      } else {
        this.$store
          .dispatch('deliveries/createDelivery', newDelivery)
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open({
                  message: 'Successfully created a delivery!',
                  queue: false
                })
              }, 750)
            } else if (response.status === 500) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open(
                  {
                    message: 'Failed to create a delivery!',
                    queue: false
                  }
                )
              }, 750)
            }
          })
      }
    }
  }
})
</script>
