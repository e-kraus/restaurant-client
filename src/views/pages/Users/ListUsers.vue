<template>
  <div>
    <hero-bar>
      Users
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Users"
        icon="radio"
      >
        <users-table checkable />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import UsersTable from '@/components/datagrids/UsersTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'Products',
  components: {
    HeroBar,
    CardComponent,
    UsersTable
  },
  data () {
    return {
      titleStack: ['Products']
    }
  }
})
</script>
