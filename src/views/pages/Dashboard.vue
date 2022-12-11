<template>
  <div>
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-danger"
          icon="chart-timeline-variant"
          :number="$store.state.products.productsCount.toString()"
          label="Menu"
        />
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="$store.state.orders.ordersCount.toString()"
          label="Orders"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="square-edit-outline"
          :number="$store.state.deliveries.deliveriesCount.toString()"
          label="Deliveries"
        />
        <card-widget
          class="tile is-child"
          type="is-secondary"
          icon="account-circle"
          :number="$store.state.users.usersCount.toString()"
          label="Users"
        />
      </tiles>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Role</th>
            <th>Description</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Super-Admin</th>
            <td>Seller</td>
            <td>Buyer</td>
          </tr>
          <tr>
            <th>Seller</th>
            <td>Buyer</td>
            <td>Super-Admin</td>
          </tr>
          <tr>
            <th>Buyer</th>
            <td>Super-Admin</td>
            <td>Seller</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import * as chartConfig from '@/components/charts/chart.config.js'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardWidget from '@/components/BaseCardWidget.vue'

export default defineComponent({
  name: 'Home',
  components: {
    CardWidget,
    Tiles,
    HeroBar
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStackEmployee: ['Employee', 'Dashboard'],
      titleStackAdmin: ['Admin', 'Dashboard'],
      pieChartData: null
    }
  },
  async mounted () {
    this.$store.dispatch('authentication/getUser')
    this.PieChartData()
    await this.$buefy.snackbar.open({
      message: 'Welcome back ' + this.$store.state.authentication.firstName,
      queue: false
    })
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
    this.$store.dispatch('orders/getAllOrders')
    this.$store.dispatch('deliveries/getAllDeliveries')
    this.$store.dispatch('users/getAllUsers')
  },
  methods: {
    PieChartData () {
      this.pieChartData = chartConfig.pieChartData()
    }
  }
})
</script>

<style scoped>
@media screen and (max-width: 992px) {
  .mediaWahome {
    width: '100%';
    height: '100%';
  }
}
</style>
