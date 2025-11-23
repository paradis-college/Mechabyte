import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Values from '../views/Values.vue';
import Achievements from '../views/Achievements.vue';
import Team from '../views/Team.vue';
import Portfolio from '../views/Portfolio.vue';
import Outreach from '../views/Outreach.vue';
import Sponsors from '../views/Sponsors.vue';
import Support from '../views/Support.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/values', name: 'values', component: Values },
  { path: '/achievements', name: 'achievements', component: Achievements },
  { path: '/team', name: 'team', component: Team },
  { path: '/portfolio', name: 'portfolio', component: Portfolio },
  { path: '/outreach', name: 'outreach', component: Outreach },
  { path: '/sponsors', name: 'sponsors', component: Sponsors },
  { path: '/support', name: 'support', component: Support },
  { path: '/contact', name: 'contact', component: Contact },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
