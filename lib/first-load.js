// Tracks whether the site has completed its very first load (fresh page load).
// The persistent shell (client-layout) flips this on first mount, regardless of
// the landing route, so the home-page loading spinners can never reappear on
// client-side navigations.
export let firstLoadDone = false

export function markFirstLoadDone() {
  firstLoadDone = true
}
