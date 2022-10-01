import { isLogin } from "./FirebaseAuth";

export function checkAuth() {
    setTimeout(() => {
      if (isLogin() === false) {
        window.location.href = "/";
      }
    }, 500);
  }