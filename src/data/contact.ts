import { services } from "@/data/services";

/** Options for the "Service Required" field, in the order they are shown. */
export const serviceOptions: string[] = [...services.map((service) => service.title), "Other"];

/** Map a ?service=<id> query value to a service option (used to pre-select). */
export function serviceOptionFromId(id: string | undefined): string | undefined {
  if (!id) return undefined;
  return services.find((service) => service.id === id)?.title;
}
