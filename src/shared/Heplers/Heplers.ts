export const getPadTime = (time: number) => time.toString().padStart(2, '0')

const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ]
export const currentDay = new Date().getDay()
  const Day = days[currentDay]

  export default Day
