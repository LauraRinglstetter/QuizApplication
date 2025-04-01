import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import QuizPage from '../views/QuizPage.vue';
import LeaderboardPage from '../views/LeaderboardPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import QuestionsPage from '../views/QuestionsPage.vue';
import MultiplayerPage from '../views/MultiplayerPage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }, 
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/multiplayer',
    name: 'multiplayer',
    component: MultiplayerPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Authentifizierungsprüfung für geschützte Seiten
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem("token"); // Prüft, ob Token existiert

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/"); // Umleitung zum Login
  } else {
    next(); // Weiterleitung erlauben
  }
});

export default router;
