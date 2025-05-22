// Exemple pour comprendre le conditional rendering avec react native avec les tabs 
export let isAuthenticated = false;

export function login() {
  isAuthenticated = true;
}

export function logout() {
  isAuthenticated = false;
}
