import axios from "axios";
import { useState, useEffect } from "react";

export type UserType = {
  avatar: string;
  id: number;
  name: string;
  email: string;
  year: number;
  color: string;
  pantone_value: string;
};
export interface IUsers {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserType[];
}

const goToPage = ({ data, page, per_page, total }: IUsers): UserType[] => {
  if ((page - 1) * per_page >= 0 && (page - 1) * per_page < total)
    return data.slice((page - 1) * per_page, Math.min(page * per_page, total));
  return [];
};

export const fetchUsers = () => {
  const [data, setData] = useState<UserType[]>();
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0)

  useEffect(() => {
    (async () => {
      setloading(true);
      const resp = await axios.get<IUsers>("https://reqres.in/api/users.").then(function (res) {
        return res.data;
      }).catch(function (error) {
        console.log(error)
        return null
      });
      setTotal(resp ? resp?.total : 0);
      setData(resp ? goToPage({ ...resp, page }) : []);
      setPerPage(resp ? resp?.per_page : 0);
      setloading(false);
    })();
  }, [page]);

  return { data, page, perPage, setPage, loading, total };
}