export default defineNuxtRouteMiddleware(async (to) => {
  let token = useCookie<boolean>('token')

  if (token.value === false && to.path === "/dashboard") {
    return navigateTo("/auth/login");
  }
});
