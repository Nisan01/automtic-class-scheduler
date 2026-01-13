import React from 'react';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";

function ReChecker({ scheduleData, onOpen, onClose }) {
  const { breakDuration, breakEnabled, breakName, breakStart, endTime,
          numbers, periodDuration, startTime, type, workingDays } = scheduleData;

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const dayStart = timeToMinutes(startTime);
  const dayEnd = timeToMinutes(endTime);

  let segments = [];
  let calculatedBreakEnd = null;

  if (!breakEnabled) {
    segments = [{ start: dayStart, end: dayEnd }];
  } else {
    const breakStartMin = timeToMinutes(breakStart);
    const breakEndMin = breakStartMin + Number(breakDuration);
    calculatedBreakEnd = minutesToTime(breakEndMin);

    segments = [
      { start: dayStart, end: breakStartMin, label: "Before Break" },
      { start: breakEndMin, end: dayEnd, label: "After Break" },
    ];
  }

  // ---------- Generate periods for each segment ----------
  const periodsBySegment = segments.map(segment => {
    const periods = [];
    let current = segment.start;
    while (current + periodDuration <= segment.end) {
      periods.push({
        start: minutesToTime(current),
        end: minutesToTime(current + periodDuration)
      });
      current += periodDuration;
    }
    return { label: segment.label || "Period", periods };
  });

  // ---------- Calculate total periods and leftover ----------
  const totalPeriods = periodsBySegment.reduce((sum, seg) => sum + seg.periods.length, 0);
  const totalLeftOver = segments.reduce((sum, seg) => sum + (seg.end - seg.start), 0) - totalPeriods * periodDuration;

  return (
    <div>
      <Dialog open={onOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Schedule</DialogTitle>
            <DialogDescription>
              Please verify the details before continuing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 text-sm">
            <p><b>Type:</b> {type}</p>
            <p><b>Number of {type}:</b> {numbers}</p>
            <p><b>Working Days:</b> {workingDays.join(", ")}</p>
            <p><b>Time:</b> {startTime} - {endTime}</p>
            <p><b>Period Duration:</b> {periodDuration} min</p>

            {breakEnabled && (
              <>
                <p><b>Break:</b> {breakName}</p>
                <p><b>Break Time:</b> {breakStart} – {calculatedBreakEnd}</p>
                <p><b>Break Duration:</b> {breakDuration} min</p>
              </>
            )}

            <p><b>Periods per Day:</b> {totalPeriods}</p>
            {totalLeftOver > 0 && (
              <p className="text-yellow-600"><b>Unused Time:</b> {totalLeftOver} minutes</p>
            )}

            <div>
              {periodsBySegment.map((seg, idx) => (
                <div key={idx} className="mb-2">
                  {seg.label && <p className="font-semibold">{seg.label}:</p>}
                  <ul className="list-disc ml-5">
                    {seg.periods.map((p, i) => (
                      <li key={i}>{p.start} – {p.end}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => console.log("Confirmed!")}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReChecker;
