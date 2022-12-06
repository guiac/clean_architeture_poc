export interface HashComparer {
  compare: (hash: string) => Promise<boolean>
}
