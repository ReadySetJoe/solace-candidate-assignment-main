"use client";

import AdvocateTable from "@/components/AdvocateTable";
import { Advocate } from "@/types/advocate";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      const params = new URLSearchParams();
      if (search) {
        params.append("q", search);
      }
      const res = await fetch(`/api/advocates?${params.toString()}`);
      const json = await res.json();
      setAdvocates(json.data);
    };

    fetchAdvocates();
  }, [search]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <main className="container mx-auto p-4">
      <h1>Solace Advocates</h1>
      <div>
        <input
          className="border p-1"
          type="text"
          value={search}
          onChange={onChange}
          placeholder="Search"
        />
        <button
          onClick={() => setSearch("")}
          className={"border p-1 ml-2"}
          disabled={search === ""}
        >
          Reset
        </button>
      </div>

      <AdvocateTable advocates={advocates} />
    </main>
  );
}
