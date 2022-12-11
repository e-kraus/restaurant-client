<template>
  <div>
    <hero-bar>
      <span style="padding-right: 20px; padding-bottom: 2px;">
        Orders
      </span>
      <div v-if="$store.state.authentication.role !== 'Buyer'">
        <router-link
          :to="{ name: 'order.new' }"
          class="button is-small"
          style="float: right !important;"
        >
          <b-icon
            icon="plus"
            size="is-small"
          />
        </router-link>
      </div>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Orders"
        icon="account"
      >
        <orders-table checkable />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import OrdersTable from '@/components/datagrids/OrdersTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'Orders',
  components: {
    HeroBar,
    CardComponent,
    OrdersTable
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStack: ['Orders']
    }
  }
})
</script>
