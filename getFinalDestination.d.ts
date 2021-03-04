type Rule = {
  fromPath: string
  toPath: string
}

declare function getFinalDestination(redirectMap: Record<string, Rule>, fromPath: string): string

export = getFinalDestination
