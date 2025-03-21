import { Court } from '../models/Court'
import { Turn } from '../models/Turn'

//esto deberia devolver el back... desde el front se le puede agregar el isReserved
export const TURNS_SLOTS: Turn[] = [
   { time_from: '08:00', time_to: '09:30', id: '0800' },
   { time_from: '09:30', time_to: '11:00', id: '0930' },
   { time_from: '11:00', time_to: '12:30', id: '1100' },
   { time_from: '12:30', time_to: '14:00', id: '1230' },
   { time_from: '14:00', time_to: '15:30', id: '1400' },
   { time_from: '15:30', time_to: '17:00', id: '1530' },
   { time_from: '17:00', time_to: '18:30', id: '1700' },
   { time_from: '18:30', time_to: '20:00', id: '1830' },
   { time_from: '20:00', time_to: '21:30', id: '2000' },
   { time_from: '21:30', time_to: '23:00', id: '2130' },
]

export const COURTS: Court[] = [
   { id: 'court_1', name: 'Cancha 1' },
   { id: 'court_2', name: 'Cancha 2' },
   { id: 'court_3', name: 'Cancha 3' },
   { id: 'court_4', name: 'Cancha 4' },
]

export const DAYS_IN_WEEK: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
