import { get } from "./helpers";

export async function fetchSiteInfo(siteId) {
  if (!siteId) throw Error("Missing site id");
  const { data } = await get(`/sites/${siteId}`);
  return data;
}

export async function fetchSiteTypes() {
  const { data } = await get('/sites/types');
  return data;
}