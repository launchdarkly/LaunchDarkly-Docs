// Obtain the final destination path for a rule by traversing through connected redirect rules.
//
// If we have a redirect from (A,B) and another from (B,C), the final destination path from A will be C.
//
// This function makes it easier to maintain our redirects, which currently break our integration tests
// whenever we introduce a chain of redirects.
function getFinalDestination(redirectMap, fromPath) {
  let toPath = redirectMap[fromPath]
  while (redirectMap[toPath]) {
    toPath = redirectMap[toPath]
  }

  return toPath
}

module.exports = getFinalDestination
