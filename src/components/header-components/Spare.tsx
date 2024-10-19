import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loading from "../loading/Loading";
import CardSmall from "../cards/CardSmall";
import { Spare } from "../../store/types";
import { fetchData } from "../../store/slices/spareSlice";

const SpareHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.spare);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="header-box">
      {data.map((i: Spare) => (
        <CardSmall
          key={i.id}
          data={i}
          image={i.SpareImages[0]}
          href="/spare/"
        />
      ))}
    </div>
  );
};

export default SpareHeader;
