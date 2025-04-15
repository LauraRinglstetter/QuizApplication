// src/services/AuthService.js

import axios from 'axios';

const url = (`${import.meta.env.VITE_API_BASE}`);

export default {
  async login(credentials) {
    try {
      const response = await axios.post(url + '/', credentials); // POST-Request an /login
      return response.data; // Antwort zurückgeben
    } catch (error) {
      console.error('Login-Fehler:', error);
      if (error.response) {
        console.error('Fehler-Response:', error.response.data); // Detaillierte Fehlerantwort ausgeben
      }
      throw error.response ? error.response.data : error.message;  // Fehler weitergeben
    }
  },
  async signUp(credentials) {
    try {
      const response = await axios.post(url + '/register/', credentials); // POST-Request an /register
      return response.data; // Antwort zurückgeben
    } catch (error) {
      console.error('Registrierungs-Fehler:', error);
      throw error.response ? error.response.data : error.message; // Fehler weitergeben
    }
  },
  async getSecretContent() {
    try {
      const response = await axios.get(url + '/start/'); // GET-Request an /start
      return response.data; // Antwort zurückgeben
    } catch (error) {
      console.error('Fehler beim Abrufen von geheimen Inhalten:', error);
      throw error.response ? error.response.data : error.message; // Fehler weitergeben
    }
  }
};