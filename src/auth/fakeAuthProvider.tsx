/**
 * This represents some generic auth provider API, like Firebase.
 */
 const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
      console.log("now user authenticated.");
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };
  
export { fakeAuthProvider };
  