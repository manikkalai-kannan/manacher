const addDelimiter = function(string, delimiter = '|') {
  return delimiter + string.toLowerCase().split('').join(delimiter) + delimiter
}

const resetPosition = function(left, center, right, adjRight) {
  if ((left + right) / 2 === center) {
    center = adjRight
  }
  left = center - (right - center)
  return [left, center, right]
}

const isSymmetric = function(left, leftEdge, right, rightEdge, text) {
  return (
    left >= leftEdge &&
    right <= rightEdge &&
    text[left] === text[right]
  )
}

const linearExpansion = function(center, right, adjRight, lps) {
  for (let i = 1; i < right - center; i++) {
    let edgeDistance = adjRight - (center + i)

    if (lps[center - i] < edgeDistance) {
      lps[center + i] = lps[center - i]
    } else if (lps[center - i] > edgeDistance) {
      lps[center + i] = edgeDistance
    } else {
      lps[center + i] = edgeDistance
      center += i
      break
    }
  }

  return [center, lps]
}

const processString = function(string, delimiter) {
  if (string === '') {
    return [0]
  }

  let text = addDelimiter(string, delimiter)
  let textLength = text.length
  let lps = Array(textLength).fill(0)

  let [left, center, right, leftEdge] = [1, 1, 1, 1]
  let rightEdge = textLength - 2
  let adjRight
  let expansion
  let positions

  while (right <= rightEdge) {
    while (isSymmetric(left, leftEdge, right, rightEdge, text)) {
      if (text[right] != delimiter) {
        lps[center] += left === right ? 1 : 2
      }
      left--
      right++
    }

    adjRight = (lps[center] > 0 && left > 0) ? (right - 1) : right

    expansion = linearExpansion(center, right, adjRight, lps)
    center = expansion[0]
    lps = expansion[1]
    positions = resetPosition(left, center, right, adjRight)
    left = positions[0]
    center = positions[1]
    right = positions[2]
  }

  return lps
}

const longestPalindrome = function(string, delimiter = '|') {
  let lps = processString(string, delimiter)
  let longest = lps.slice(0).sort((a, b) => a - b).pop()
  let ctrIndex = Math.floor(lps.indexOf(longest) / 2)
  let halfWord = Math.floor(longest / 2)
  let start = ctrIndex - halfWord
  let end = ctrIndex + halfWord
  end += longest % 2 === 0 ? 0 : 1

  return string.substring(start, end)
}

export {
  addDelimiter,
  resetPosition,
  isSymmetric,
  linearExpansion,
  processString,
  longestPalindrome
}
