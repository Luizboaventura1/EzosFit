export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie<boolean>("token");

  // If the token does not exist and the user tries to access /dashboard or /questionnaire
  if (
    !token.value &&
    (to.path === "/dashboard" || to.path === "/questionnaire")
  ) {
    return navigateTo("/auth/login");
  }
});
