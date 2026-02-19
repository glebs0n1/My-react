export const getLithuaniaDate = () =>
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Vilnius" })
    );
  
  export const isOpenNow = (workingHours?: string): boolean => {
    if (!workingHours) return false;
  
    const now = getLithuaniaDate();
    const day = now.getDay(); // 0 = Sun
    const minutesNow = now.getHours() * 60 + now.getMinutes();
  
    const dayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
  
    // "Mon–Fri 09:00–18:00"
    const [daysPart, hoursPart] = workingHours.split(" ");
    if (!daysPart || !hoursPart) return false;
  
    const [startDay, endDay] = daysPart.split("–");
    const startDayIndex = dayMap[startDay];
    const endDayIndex = dayMap[endDay];
  
    if (
      startDayIndex === undefined ||
      endDayIndex === undefined ||
      day < startDayIndex ||
      day > endDayIndex
    ) {
      return false;
    }
  
    const [start, end] = hoursPart.split("–");
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
  
    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;
  
    return minutesNow >= startMinutes && minutesNow <= endMinutes;
  };