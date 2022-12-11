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
              label="ID"
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
              label="Product Name"
              message="Product name"
              horizontal
            >
              <b-input
                v-model="form.name"
                placeholder="e.g. Product One"
                required
              />
            </b-field>
            <b-field
              label="Product Description"
              message="Product description"
              horizontal
            >
              <b-input
                v-model="form.description"
                placeholder="e.g. This product is like this"
                required
              />
            </b-field>
            <b-field
              label="Quantity in Stock"
              message="Stock"
              horizontal
            >
              <b-input
                v-model="form.quantity"
                placeholder="e.g. 433"
                required
              />
            </b-field>
            <b-field
              label="Price per unit"
              message="$"
              horizontal
            >
              <b-input
                v-model="form.price"
                placeholder="e.g. 100"
                required
              />
            </b-field>
            <b-field
              label="Image url"
              message="https:///...."
              horizontal
            >
              <b-input
                v-model="form.image"
                placeholder=""
                required
              />
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
                @click="$router.push('/dashboard/teams')"
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
  name: 'ProductsForm',
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
        id: '',
        name: '',
        description: '',
        quantity: '',
        price: '',
        image: '',
        user_id: ''
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Products',
        this.isProfileExists ? this.form.name : 'New Product'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'create food item'
    },
    heroRouterLinkTo () {
      return this.isProfileExists ? { name: 'product.new' } : { name: 'Products' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Product' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Food Item' : 'create food item'
    },
    ...mapState({
      products: state => state.products.products
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.name = ''
        this.form.description = ''
        this.form.quantity = ''
        this.form.price = ''
        this.form.image = ''
        this.form.user_id = ''
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
    this.form.user_id = this.$store.state.authentication.userId
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.products.find((product) => product.id === this.$route.params.id)

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.name = item.name
          this.form.description = item.description
          this.form.price = item.price
          this.form.quantity = item.quantity
          this.form.image = item.image
          this.form.user_id = this.$store.state.authentication.userId
        }
      } else {
        this.$router.push({ name: 'product.new' })
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      const productData = {
        description: this.form.description,
        quantity: this.form.quantity,
        price: this.form.price,
        image: this.form.image,
        name: this.form.name,
        user_id: this.$store.state.authentication.userId

      }
      const updateProduct = {
        productId: this.$route.params.id,
        product: this.form
      }
      if (this.$route.params.id) {
        this.$store.dispatch('products/updateProduct', updateProduct)
        this.$buefy.snackbar.open({
          message: 'Successfully updated the product',
          queue: true
        })
      } else {
        this.$store.dispatch('products/createProduct', productData)
        this.$buefy.snackbar.open({
          message: 'Successfully created the product',
          queue: true
        })
      }
    }
  }
})
</script>
