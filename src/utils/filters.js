import moment from 'moment';

export const timeFilter = (data, format = 'YYYY-MM-DD', msg) => {
  if (data) {
    return moment(data).format(format);
  } else {
    return msg;
  }
};
