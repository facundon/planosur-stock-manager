export type ExtractArray<T> = T extends (infer U)[] ? U : T
