import { Advocate } from "@/types/advocate";
import { useState } from "react";

export default function AdvocateRow({ advocate }: { advocate: Advocate }) {
  const [expandSpecialties, setExpandSpecialties] = useState(false);

  return (
    <tr key={advocate.id} className="border border-slate-300 p-4">
      <td className="font-bold p-2">
        {advocate.firstName} {advocate.lastName}, {advocate.degree}
      </td>
      <td className="p-2">{advocate.city}</td>
      <td className="p-2">
        {advocate.specialties
          .slice(0, expandSpecialties ? undefined : 3)
          .map(s => (
            <div key={s}>{s}</div>
          ))}
        {advocate.specialties.length > 3 && (
          <button
            className="text-blue-400 underline"
            onClick={() => setExpandSpecialties(!expandSpecialties)}
          >
            {expandSpecialties ? "Show Less" : "Show More"}
          </button>
        )}
      </td>
      <td className="p-2">{advocate.yearsOfExperience}</td>
      <td className="p-2">{advocate.phoneNumber}</td>
    </tr>
  );
}
