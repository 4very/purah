function redirectToSearch(search: string) {
  return navigateTo({
    path: `/gallery`,
    query: { q: search },
  })
}

export default redirectToSearch
