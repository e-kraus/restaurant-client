<template>
  <div>
    <title-bar :title-stack="titleStack" />
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
              label="Order ID"
              horizontal
            >
              <b-input
                v-model="form.id"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <hr>
            <b-field
              label="Product ID"
              message="ID of the product"
              horizontal
            >
              <b-input
                v-model="form.product_id"
                placeholder="e.g. 13232"
                required
              />
            </b-field>
            <b-field
              label="User ID"
              message="ID of the user"
              horizontal
            >
              <b-input
                v-model="form.user_id"
                placeholder="e.g. 3434343"
                required
              />
            </b-field>
            <b-field
              label="Seller ID"
              message="Owner of this product belongs to"
              horizontal
            >
              <b-input
                v-model="form.seller_id"
                placeholder="e.g. 434343"
                required
              />
            </b-field>
            <b-field
              label="Cost"
              message="cost per item"
              horizontal
            >
              <b-input
                v-model="form.cost"
                placeholder="e.g. 1200"
                required
              />
            </b-field>
            <b-field
              label="Quantity"
              message="Number of food items to buy"
              horizontal
            >
              <b-input
                v-model="form.quantity"
                placeholder="e.g. 20"
                required
              />
            </b-field>
            <b-field
              label="Payment status"
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
              :disabled="userRole == 'Buyer'"
              label="Dispatch status"
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
              label="Deliver status"
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
                @click="$router.push('/dashboard/orders')"
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
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardComponent from '@/components/BaseCardComponent.vue'

export default defineComponent({
  name: 'OrdersForm',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar
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
      loadData: '',
      form: {
        id: '',
        product_id: '',
        seller_id: '',
        user_id: '',
        cost: '',
        quantity: '',
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
        'Orders',
        this.isProfileExists ? this.form.name : 'New Order'
      ]
    },
    userRole () {
      return this.$store.state.authentication.role
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create Order'
    },
    heroRouterLinkTo () {
      return this.isProfileExists ? { name: 'order.new' } : { name: 'Orders' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Order' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Order' : 'Create Order'
    },
    ...mapState({
      orders: state => state.orders.orders
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.product_id = ''
        this.form.user_id = ''
        this.form.seller_id = ''
        this.form.cost = ''
        this.form.quantity = ''
        this.form.payment_status = ''
        this.form.dispatch_status = ''
        this.form.delivery_status = ''
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.loadData = this.$store.state.orders.ordersCount
    this.getData()
    const initialData = this.$route.params
    this.form.product_id = initialData.productId
    this.form.user_id = this.$store.state.authentication.userId
    this.form.seller_id = initialData.sellerId
    this.form.cost = initialData.cost
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.orders.find((order) => order.id === this.$route.params.id)
        console.log('item found ', item)
        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.product_id = item.product_id
          this.form.seller_id = item.seller_id
          this.form.user_id = item.user_id
          this.form.cost = item.cost
          this.form.quantity = item.quantity
          this.form.dispatch_status = item.dispatch_status
          this.form.payment_status = item.payment_status
          this.form.delivery_status = item.delivery_status
        }
      } else {
        this.$router.push({ name: 'order.new' })
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    async submit () {
      const orderData = {
        product_id: this.form.product_id,
        user_id: this.form.user_id,
        seller_id: this.form.seller_id,
        cost: this.form.cost,
        quantity: this.form.quantity,
        payment_status: this.form.payment_status,
        dispatch_status: this.form.dispatch_status,
        delivery_status: this.form.delivery_status
      }
      const updateOrder = {
        orderId: this.$route.params.id,
        order: this.form
      }
      if (this.$route.params.id) {
        try {
          this.$store.dispatch('orders/updateOrder', updateOrder)
          this.$buefy.snackbar.open({
            message: 'Successfully updated the order',
            queue: true
          })
        } catch (error) {
          this.$buefy.snackbar.open({
            message: 'Error created the order',
            queue: true
          })
        }
      } else {
        this.$store.dispatch('orders/createOrder', orderData)
        this.$buefy.snackbar.open({
          message: 'Successfully created the order',
          queue: true
        })
      }
    },
    test () {
      console.log(this.loadData)
    }
  }
})
</script>
