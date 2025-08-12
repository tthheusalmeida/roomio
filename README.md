<h3 align="center">
    <img alt="Roomio" width="100%" title="#logo" src="public/doc/banner.png">
    <br>
</h3>
<p align="center"> 🎮 <strong>Roomio</strong> is an online multiplayer gaming platform with real-time integration.
 </p>

<p align="center">
   <img src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/tthheusalmeida/roomio/">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/tthheusalmeida/roomio/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" target="_blank" />
  </a>
</p>

# 🗂️ Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [In Action](#in-action)
- [How to Contribute](#how-to-contribute)

<a id="about"></a>

## 📚 About

**Roomio** is an online multiplayer gaming platform with authentication, ranking, and private rooms.
Currently, it includes the **Tic Tac Toe** game, featuring:

- Private room creation with shareable links.
- Invite players via direct link.
- Login system with Firebase (Google, Email/Password, etc.).
- User data storage and match history.
- Automatic scoring (+10 points per win).
- Real-time global ranking.
- Rematch feature for quick new games.

Main flow:

1. Login via Firebase.
2. Access the **Home** page with a list of available games.
3. Select a game → create or join a room (`/game/<game_slug>/<uuid>`).
4. If the user is not logged in, the room data is saved in **LocalStorage** until authentication.
5. Matches run in real time via **Socket.IO**.

---

<a id="technologies"></a>

## 🚀 Technologies

### **Frontend** [Hosting on: [Vercel ](https://vercel.com/)]

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Confetti](https://www.npmjs.com/package/react-confetti)
- [Socket.IO Client](https://socket.io/)

### **Backend** [Hosting on: [Render ](https://render.com/)]

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [Firebase Admin](https://firebase.google.com/docs/admin)
- [PostgreSQL - NeonDB](https://neon.tech/)
- [pg (node-postgres)](https://node-postgres.com/)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)

---

Note: This repository contains only the frontend code. The backend is stored in a separate, secure repository.

---

<a id="in-action"></a>

## In Action

You can try at: [Room.io](https://roomio-rust.vercel.app/)

<a id="how-to-contribute"></a>

## 😃 How to Contribute

- Leave a ⭐ if you liked the project!
- Fork the repository.
- Create a branch for your feature: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'feat: my new feature'`
- Push to the branch: `git push origin my-feature`

---

## 📝 License

This project is under the MIT license.
See the [license page](https://opensource.org/licenses/MIT) for more details.

---

<h4 align="center">
    Made with 💜 by <a href="https://www.linkedin.com/in/matheus-almeida-602139182/" target="_blank">Matheus Almeida</a>
</h4>
