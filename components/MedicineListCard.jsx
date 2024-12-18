import "../src/tailwind.css";
import { useState, useEffect } from "react";

function MedicineListCard({ medicineCardInfo, uniqueID }) {
  const startDate = new Date(medicineCardInfo.startingDate);
  const endDate = new Date(medicineCardInfo.endingDate);
  const numberOfDays = (endDate - startDate) / 1000 / 3600 / 24;
  const medicationDuration = Math.round(numberOfDays);
  const tempArray = [];
  for (let index = 0; index <= medicationDuration; index++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    tempArray.push({ dateString: date.toDateString(), isDone: false });
  }

  const [medicineChecklistArray, setMedicineChecklistArray] = useState(() => {
    const localStorageData = window.localStorage.getItem(
      `medicine-checklist-${uniqueID}`
    );
    return localStorageData ? JSON.parse(localStorageData) : tempArray;
  });

  useEffect(() => {
    window.localStorage.setItem(
      `medicine-checklist-${uniqueID}`,
      JSON.stringify(medicineChecklistArray)
    );
  }, [medicineChecklistArray]);

  const handleChecklistChange = (i) => {
    setMedicineChecklistArray((previousArray) =>
      previousArray.map((item, index) =>
        index === i ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  return (
    <section
      className="rounded-lg border border-emerald-500 bg-emerald-200 
    min-h-full p-2"
    >
      <p
        className="text-xl text-center text-transparent font-serif font-semibold 
      medicine-list-card-para-background-image"
      >
        Have I taken my medicine?
      </p>
      <ul className="mb-4">
        {medicineChecklistArray.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-between px-2 rounded-sm my-1
          medicine-list-card-items-background-image text-sm font-semibold italic"
          >
            <span>{item.dateString}</span>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => handleChecklistChange(index)}
            />
          </li>
        ))}
      </ul>
      <ul className="pl-2 border-l-4 border-l-emerald-500">
        <li>
          Medicine Name:{" "}
          <span className="font-semibold italic text-neutral-800">
            {medicineCardInfo.name}
          </span>
        </li>
        <li>
          Medicine Type:{" "}
          <span className="font-semibold italic text-neutral-800">
            {medicineCardInfo.type}
          </span>
        </li>
        <li>
          Medicine Dosage:{" "}
          <span className="font-semibold italic text-neutral-800">
            {medicineCardInfo.dosage}
          </span>
        </li>
        <li>
          Medicine Time:{" "}
          <span className="font-semibold italic text-neutral-800">
            {medicineCardInfo.time}
          </span>
        </li>
        <li>
          Frequency:{" "}
          <span className="font-semibold italic text-neutral-800">
            {medicineCardInfo.frequency}
          </span>
        </li>
        <li>
          Instructions:{" "}
          <span className="font-semibold italic text-neutral-800">
            {medicineCardInfo.instructions}
          </span>
        </li>
      </ul>
    </section>
  );
}
export { MedicineListCard };
