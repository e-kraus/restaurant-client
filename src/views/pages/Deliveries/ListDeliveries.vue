<template>
  <div>
    <hero-bar>
      <span style="padding-right: 20px; padding-bottom: 2px;">
        Deliveries
      </span>
      <router-link
        :to="{ name: 'deliveries.new' }"
        class="button is-small"
        style="float: right !important;"
      >
        <b-icon
          icon="plus"
          size="is-small"
        />
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Deliveries"
      >
        <deliveries-table checkable />
      </card-component>
      <hr>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DeliveriesTable from '@/components/datagrids/DeliveriesTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'Deliveries',
  components: {
    HeroBar,
    CardComponent,
    DeliveriesTable
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStack: ['Deliveries']
    }
  }
})
</script>
