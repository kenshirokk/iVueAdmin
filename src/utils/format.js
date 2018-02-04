
import moment from 'moment/moment'

export function dateFormat(date){
    if (date == undefined) {
      return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export function ifnull(o, str){
  return o?o:str;
}
