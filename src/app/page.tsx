"use client";

import AdvocateTable from "@/components/AdvocateTable";
import { Advocate } from "@/types/advocate";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchAdvocates = async () => {
      const params = new URLSearchParams();
      if (search) {
        params.append("q", search);
      }
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      const res = await fetch(`/api/advocates?${params.toString()}`);
      const json = await res.json();
      setAdvocates(json.data);
    };

    fetchAdvocates();
  }, [search, page, limit]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>
      <div className="mt-4 mb-4 flex justify-between items-center">
        <div>
          <input
            className="border p-1 w-64"
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

        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            {"<"}
          </button>
          <span className="mx-2">Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={advocates.length < 10}
          >
            {">"}
          </button>
          <select
            className="ml-4"
            value={limit}
            onChange={e => {
              setLimit(parseInt(e.target.value, 10));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map(size => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      <AdvocateTable advocates={advocates} />
    </main>
  );
}
