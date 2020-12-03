const dateDiff = (date1, date2) => Math.ceil((date1 - date2) / (1000 * 60 * 60 * 24));

export const prepareAlertsData = (alerts, currentDistance) => {
  const currentDate = new Date().getTime();
  return alerts.map((alert) => {
    if (alert.distanceAlert) {
      const remainDistance = (alert.endDistance - alert.startDistance)
      - (currentDistance - alert.startDistance);
      return {
        ...alert,
        remainDistance,
        distanceTocompare: remainDistance,
      };
    } if (alert.dateAlert) {
      const dayLeft = dateDiff(
        new Date(alert.endDate).getTime(),
        currentDate,
      );
      return {
        ...alert,
        remainDays: dayLeft,
        distanceTocompare: dayLeft * 50 * 1000,
      };
    }
    return alert;
  });
};

export const getNextAlert = (alerts) => alerts
  .sort((a, b) => a.distanceTocompare - b.distanceTocompare)[0];

export const getRequireActionAlert = (alerts) => alerts.find((alert) => alert.requireAction);
