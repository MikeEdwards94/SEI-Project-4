export const timeConverter = (time) => {
  return (time.slice(0, 10).split('-').reverse().join('-'))
}