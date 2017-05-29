function transitionColor(from, to, count) {
  count = count + 1
  const int = parseInt(from, 16) // 100
  const intTo = parseInt(to, 16) // 50
  const list = [] // 5
  const diff = int - intTo // 50
  const isNegative = diff < 0 // false
  const one = diff / count // 10
 
  list.push(from)
  for (let i = 1; i <= count; i++) {
    list.push(Math.floor(int - (one * i)).toString(16))
  }
 
  return list
}
 
function transition(from, to, count) {
  count = count || 3
  const r = from.slice(0, 2), g = from.slice(2, 4), b = from.slice(4, 6)
  const rt = to.slice(0, 2), gt = to.slice(2, 4), bt = to.slice(4, 6)
  const allR = transitionColor(r, rt, count)
  const allG = transitionColor(g, gt, count)
  const allB = transitionColor(b, bt, count)
  const list = []
 
  allR.forEach(function(_, i) {
    list.push('' + allR[i] + allG[i] + allB[i])
  })
 
  return list
}
 
export function generateGradientStepsCss(from, to, count) {
  from = from.replace('#', '')
  to = to.replace('#', '')
  const values = transition(from, to, count)
  const total = 100 / (count + 1)
  let obj = []
  for (let i = 0; i <= count + 1; i++) {
    obj.push({percentage: Math.floor(total * i), value: values[i]})
  }
  return obj.map(function(value) {
    return '#' + value.value
  })
}