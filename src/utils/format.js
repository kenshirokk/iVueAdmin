
import moment from 'moment/moment'

export function dateFormat(row, column){
    var date = row[column.property];
    if (date == undefined) {
      return "";
    }
    return moment(date).format("YYYY-MM-DD");
}

export function ifnull(o, str){
  return o?o:str;
}
