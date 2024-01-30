import { createConsola } from "consola";
import type { ConsolaOptions } from 'consola';

export function useLogger (tag?: string, options: Partial<ConsolaOptions> = { level: 1000 }) {
    return tag ? createConsola(options).withTag(tag) : createConsola(options)
}