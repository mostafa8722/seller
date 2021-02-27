import jalalim from 'jalali-moment'

const days = ['دوشنبه','سه شنیه','چهارشنبه','پنج شنبه','جمعه','شنبه','یک شنبه']

const getToday = () => {
    let today = jalalim().day()
    return days[today-1]
}

const getNextSixDays = () => {
    let sixDays = []
    console.log('zz',jalalim().add(1, 'days').day())
    let today = jalalim().day()
    for(let i = 1 ; i<8 ; i++){
        console.log(today)
        if(today != 0)
            sixDays.push({day:days[today-1],date:jalalim().add(i-1, 'days').locale('fa').format('DD') + " " + jalalim().add(i, 'days').locale('fa').format('MMMM')})
        else
            sixDays.push(days[6])
        if(today<7){
            today++
        }
        else
            today = 1
    }
    return sixDays
}

export default {getToday,getNextSixDays}