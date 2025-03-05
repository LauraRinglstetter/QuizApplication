import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import QuizPage from '../views/QuizPage.vue';
import LeaderboardPage from '../views/LeaderboardPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import QuestionsPage from '../views/QuestionsPage.vue';
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
    component: HomePage
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizPage
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionsPage
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
