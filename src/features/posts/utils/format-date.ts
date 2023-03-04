import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Timestamp } from 'firebase/firestore'

export const formatDate = (date: Timestamp) => formatDistanceToNow(date.toDate(), { addSuffix: true })
