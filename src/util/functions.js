import firestore from '@react-native-firebase/firestore';

export const getChunks = (arr, len) => {
  let i = 0;
  const n = arr.length;
  const chunks = [];

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
};

export const getFullName = user => {
  let fullName = '';

  if (user && user.firstName) {
    fullName += user.firstName;
  }
  if (user && user.middleName) {
    fullName += ` ${user.middleName}`;
  }
  if (user && user.lastName) {
    fullName += ` ${user.lastName}`;
  }

  return fullName;
};

export const getPrevMonths = (count = 1) => {
  const data = [];
  for (let i = 0; i < +count; i++) {
    const date = new Date();
    date.setDate(1);
    date.setUTCHours(0, 0, 0, 0);
    date.setMonth(date.getMonth() - i);
    data.push(date);
  }
  return data;
};

export const firestoreTimestampToDate = timestamp => {
  if (
    timestamp &&
    typeof timestamp._nanoseconds === 'number' &&
    typeof timestamp._seconds === 'number'
  ) {
    return new firestore.Timestamp(
      timestamp._seconds,
      timestamp._nanoseconds,
    ).toDate();
  }
  if (
    timestamp &&
    typeof timestamp.nanoseconds === 'number' &&
    typeof timestamp.seconds === 'number'
  ) {
    return new firestore.Timestamp(
      timestamp.seconds,
      timestamp.nanoseconds,
    ).toDate();
  }
  return timestamp ? new Date(timestamp) : new Date();
};

export const getMonthsBetween = (
  start = new Date('2021-01-01'),
  end = new Date(),
) => {
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const dates = [];

  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i !== endYear ? 11 : end.getMonth();
    const startMon = i === startYear ? start.getMonth() : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1;
      const displayMonth = month < 10 ? '0' + month : month;
      dates.push({
        label: [i, displayMonth, '01'].join('-'),
        value: new Date([i, displayMonth, '01'].join('-')),
      });
      dates.push();
    }
  }
  return dates;
};
