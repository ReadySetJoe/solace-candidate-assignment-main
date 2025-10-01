import { Advocate } from "@/types/advocate";
import AdvocateRow from "./AdvocateRow";

export default function AdvocateTable({
  advocates,
}: {
  advocates: Advocate[];
}) {
  return (
    <table className="table-auto w-full mt-4 border-collapse border border-slate-400">
      <thead className="bg-slate-200">
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map(advocate => (
          <AdvocateRow key={advocate.id} advocate={advocate} />
        ))}
      </tbody>
    </table>
  );
}
