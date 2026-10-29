const bengaliNumberFormat = new Intl.NumberFormat("bn-BD");

export function formatBengaliNumber(value: number) {
  return bengaliNumberFormat.format(value);
}

export function formatPrice(value: number) {
  return `${formatBengaliNumber(value)} টাকা`;
}

export function formatUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    pc: "প্রতি পিস",
    packet: "প্রতি প্যাকেট",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}
